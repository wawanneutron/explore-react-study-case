export default function Options({ question, answer, dispatch }) {
  const hasAnswer = answer !== null

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          className={`btn btn-option ${answer === index && 'answer'} ${
            hasAnswer && index === question.correctOption ? 'correct' : 'wrong'
          }`}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
