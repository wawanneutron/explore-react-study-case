import { useNavigate, useRouteError } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()
  const error = useRouteError()

  console.log(error)

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <h2>{error.status}</h2>
      <h3>{error.statusText}</h3>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  )
}

export default Error
