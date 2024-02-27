import { useNavigate } from 'react-router-dom'
import PageNav from '../components/PageNav'
import styles from './Homepage.module.css'
import { useAuth } from '../contexts/FakeAuthContext'
import Button from '../components/Button'

export default function Homepage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  function handleGetStarted() {
    isAuthenticated ? navigate('/app') : navigate('/login')
  }

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>

        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>

        <Button onClick={handleGetStarted} type="primary">
          Start tracking now
        </Button>
      </section>
    </main>
  )
}
