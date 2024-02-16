import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'
import Logo from './Logo'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* render porps child rout */}
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyrihgt {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </aside>
  )
}
