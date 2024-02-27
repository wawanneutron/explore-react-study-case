import CityItem from './CityItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import styles from './CityList.module.css'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool
}

export default function CityList() {
  const { cities, isLoading, error } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    )

  if (error) return <Message message={error} />

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  )
}
