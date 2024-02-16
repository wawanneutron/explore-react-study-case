import { NavLink } from 'react-router-dom'
import styles from './AppNav.module.css'

export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">App navigation</NavLink>
        </li>
        <li>
          <NavLink to="countries">List of cities</NavLink>
        </li>
      </ul>
    </nav>
  )
}
