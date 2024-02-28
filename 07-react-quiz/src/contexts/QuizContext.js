import { createContext, useContext, useEffect, useReducer } from 'react'

const QuizContext = createContext()

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
}

function reducer(state, action) {
  const question = state.questions.at(state.index)

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }

    case 'dataFailed':
      return { ...state, questions: [], status: 'error' }

    case 'start':
      return { ...state, status: 'active' }

    case 'newAnswer':
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      }

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }

    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      }

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready'
      }

    default:
      throw new Error('Unknow Action')
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  )

  useEffect(() => {
    async function fetchDataQuestions() {
      try {
        const data = await fetch('http://localhost:9000/questions')
        const dataQuestions = await data.json()
        dispatch({ type: 'dataReceived', payload: dataQuestions })
      } catch (error) {
        dispatch({ type: 'dataFailed' })

        throw new Error('error fetch data')
      }
    }

    fetchDataQuestions()
  }, [])

  return (
    <QuizContext.Provider
      value={{
        dispatch,
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        numQuestions,
        maxPossiblePoints
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)

  if (context === undefined)
    throw new Error('QuizContext was used outside of the QuizProvider')

  return context
}

export { QuizProvider, useQuiz }
