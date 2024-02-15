import { Link } from 'react-router-dom'
import PageNav from './components/PageNav'
import AppNav from './components/AppNav'

export default function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h3 className="test">WorldWise</h3>

      <Link to="/app">Go to the app</Link>
    </div>
  )
}
