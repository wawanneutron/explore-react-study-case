export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer
}) {
  return (
    <header className=" progress">
      <progress
        max={numQuestions}
        value={answer ? index + 1 : index}
        // value={index + Number(answer !== null)} same way
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  )
}
