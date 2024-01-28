import React from 'react'
import ReactDOM from 'react-dom/client'
// import StarRating from './StarRating'
import './index.css'
import App from './App'

// function Test() {
//   const [movieRating, setMovieRating] = useState(0)

//   return (
//     <>
//       <StarRating color="orange" size={68} onSetRating={setMovieRating} />
//       <p>This movie was rated {movieRating} stars</p>
//     </>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating size={28} color="red" className="test-classname" />
    <StarRating messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']} />
    <StarRating maxRating={10} color="purple" /> */}
    {/* <Test /> */}
  </React.StrictMode>
)
