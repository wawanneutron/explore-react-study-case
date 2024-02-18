import { useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams()

  let lat = searchParams.get('lat')
  let lng = searchParams.get('lng')

  return (
    <div className={styles.mapContainer}>
      {lat && lng && (
        <>
          <h1>position latitude: {lat}</h1>
          <h1>Posotion longitude: {lng}</h1>

          <button onClick={() => setSearchParams({ lat: 804, lng: 143 })}>
            Change
          </button>
        </>
      )}
    </div>
  )
}
