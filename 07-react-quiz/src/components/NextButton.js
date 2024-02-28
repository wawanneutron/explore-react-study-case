import { useQuiz } from '../contexts/QuizContext'

export default function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz()

  if (answer === null) return

  if (index < numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: 'nextQuestion' })}
        className="btn btn-ui"
      >
        Next
      </button>
    )

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: 'finished' })}
        className="btn btn-ui"
      >
        Finish
      </button>
    )
}
