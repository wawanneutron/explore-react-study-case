import { useAuth } from '../contexts/FakeAuthContext'
import styles from './User.module.css'

export default function User() {
  const { user, logout } = useAuth()
  const { name, avatar } = user

  function handleLogout() {
    logout()
  }

  return (
    <div className={styles.user}>
      <img src={avatar} alt={`image ${name}`} title={name} />
      <span>Welcome, {name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
