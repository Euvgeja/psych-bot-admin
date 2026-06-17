const AUTH_STORAGE_KEY = 'psych-bot-admin-auth'

export interface StoredAuth {
  username: string
}

function getExpectedCredentials() {
  return {
    username: import.meta.env.VITE_ADMIN_USER ?? 'admin',
    password: import.meta.env.VITE_ADMIN_PASSWORD ?? 'changeme',
  }
}

export const authService = {
  readSession(): StoredAuth | null {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      return null
    }
    try {
      return JSON.parse(raw) as StoredAuth
    } catch {
      return null
    }
  },

  login(username: string, password: string): StoredAuth | null {
    const expected = getExpectedCredentials()
    if (username !== expected.username || password !== expected.password) {
      return null
    }
    const session = { username }
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    return session
  },

  logout(): void {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
  },
}
