import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login as loginAPI } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export const useLogin = () => {
  const navigate = useNavigate()

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      loginAPI({
        email,
        password,
      }),

    onSuccess: () => {
      toast.success('Login success')
      navigate('/dashboard')
    },

    onError: (err) => {
      console.log('ERROR', err)

      toast.error('Provided email or password are incorrect')
    },
  })

  return { login, isLoading }
}
