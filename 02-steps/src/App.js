import { useState } from 'react'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑'
]

export default function App() {
  return <Steps />
}

export function Steps() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsopen] = useState(true)

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1)
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1)
  }

  return (
    <>
      <div className="close-wrap">
        <button className="close" onClick={() => setIsopen((open) => !open)}>
          &times;
        </button>
      </div>

      {isOpen && (
        <section className="steps">
          <div className="numbers">
            <div className={`${step >= 1 && 'active'}`}>1</div>
            <div className={`${step >= 2 && 'active'}`}>2</div>
            <div className={`${step >= 3 && 'active'}`}>3</div>
          </div>

          {/* <p className="message">
            Step {step}: {messages[step - 1]}
          </p> */}
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() =>
                  window.alert(`Learn how to ${messages[step - 1]}`)
                }
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" txtColor="#fff" onClick={handlePrevious}>
              <span>👈</span>
              Previous
            </Button>

            <Button bgColor="#7950f2" txtColor="#fff" onClick={handleNext}>
              <span>👉</span>
              Next
            </Button>
          </div>
        </section>
      )}
    </>
  )
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  )
}

function Button({ bgColor, txtColor, children, onClick }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: txtColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
