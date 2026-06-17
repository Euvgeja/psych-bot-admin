import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { authService, type StoredAuth } from '../service/authService'

interface AuthContextValue {
  isAuthenticated: boolean
  username: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<StoredAuth | null>(() => authService.readSession())

  const login = useCallback((username: string, password: string) => {
    const nextSession = authService.login(username, password)
    if (!nextSession) return false
    setSession(nextSession)
    return true
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: session !== null,
      username: session?.username ?? null,
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
