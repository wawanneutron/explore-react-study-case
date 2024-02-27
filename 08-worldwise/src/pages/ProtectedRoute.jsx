import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute
