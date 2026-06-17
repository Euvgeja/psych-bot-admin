import { type FormEvent, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { LoginView } from '../view/Login.view'

export function useLoginController() {
  const { isAuthenticated, login } = useAuth()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const redirectTo =
    (location.state as { from?: string } | null)?.from &&
    (location.state as { from?: string }).from !== '/login'
      ? (location.state as { from: string }).from
      : '/clients'

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (login(username.trim(), password)) {
      setError(null)
      return
    }
    setError('Неверный логин или пароль')
  }

  return {
    isAuthenticated,
    redirectTo,
    viewModel: {
      username,
      password,
      error,
      onUsernameChange: setUsername,
      onPasswordChange: setPassword,
      onSubmit: handleSubmit,
    },
  }
}

export function LoginPage() {
  const { isAuthenticated, redirectTo, viewModel } = useLoginController()
  if (isAuthenticated) return <Navigate to={redirectTo} replace />
  return <LoginView {...viewModel} />
}
