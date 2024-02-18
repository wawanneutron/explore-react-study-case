import PropTypes from 'prop-types'
import styles from './CountryItem.module.css'

CountryItem.propTypes = {
  country: PropTypes.object
}

export default function CountryItem({ country }) {
  const { countryName, emoji } = country
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3>{countryName}</h3>
    </li>
  )
}
