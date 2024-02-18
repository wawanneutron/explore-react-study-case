import Spinner from './Spinner'
import PropTypes from 'prop-types'
import styles from './CountryList.module.css'
import Message from './Message'
import CountryItem from './CountryItem'

CountryList.propTypes = {
  cities: PropTypes.array,
  loading: PropTypes.bool
}

export default function CountryList({ cities, loading }) {
  if (loading) return <Spinner />

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    )

  const countries = cities.map((city) => ({
    countryName: city.country,
    emoji: city.emoji,
    id: city.id
  }))

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  )
}
