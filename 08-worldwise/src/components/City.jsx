import { useParams, useSearchParams } from 'react-router-dom'

export default function City() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  let lat = searchParams.get('lat')
  let lng = searchParams.get('lng')

  return (
    <div>
      <h1>City - {id}</h1>
      <br />
     <h3>position latitude: {lat}</h3>
      <h3>Posotion longitude: {lng}</h3>
    </div>
  )
}
