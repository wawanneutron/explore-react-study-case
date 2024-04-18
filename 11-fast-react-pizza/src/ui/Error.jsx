import { useRouteError } from 'react-router-dom'
import LinkButton from './LinkButton'

function Error() {
  const error = useRouteError()

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <h2>{error.status}</h2>
      <h3>{error.statusText}</h3>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  )
}

export default Error
