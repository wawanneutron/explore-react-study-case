import CityItem from './CityItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import styles from './CityList.module.css'
import Message from './Message'

CityList.propTypes = {
  cities: PropTypes.array,
  loading: PropTypes.bool
}

export default function CityList({ cities, loading }) {
  if (loading) return <Spinner />

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    )

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  )
}
