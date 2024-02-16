import { Link } from 'react-router-dom'
import { logo } from './Logo.module.css'

export default function Logo() {
  return (
    <Link to="/">
      <img className={logo} src="/logo.png" alt="logo worldwise" />
    </Link>
  )
}
