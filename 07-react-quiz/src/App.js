import { useEffect, useReducer } from 'react'

import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'

const initialState = {
  questions: [],

  status: 'loading'
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, questions: [], status: 'error' }
    default:
      throw new Error('Unknow Action')
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length

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
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  )
}
