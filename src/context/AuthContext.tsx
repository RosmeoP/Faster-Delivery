import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type LoginResponse } from './authContextValue'

const storageKeys = {
  token: 'authToken',
  nombre: 'authNombre',
  apellido: 'authApellido',
  email: 'authEmail',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(storageKeys.token))
  const [nombre, setNombre] = useState(() => localStorage.getItem(storageKeys.nombre) ?? '')
  const [apellido, setApellido] = useState(() => localStorage.getItem(storageKeys.apellido) ?? '')
  const [email, setEmail] = useState(() => localStorage.getItem(storageKeys.email) ?? '')

  const login = (response: LoginResponse) => {
    setToken(response.token)
    setNombre(response.user.firstName)
    setApellido(response.user.lastName)
    setEmail(response.user.email)
    localStorage.setItem(storageKeys.token, response.token)
    localStorage.setItem(storageKeys.nombre, response.user.firstName)
    localStorage.setItem(storageKeys.apellido, response.user.lastName)
    localStorage.setItem(storageKeys.email, response.user.email)
  }

  const logout = () => {
    setToken(null)
    setNombre('')
    setApellido('')
    setEmail('')
    localStorage.removeItem(storageKeys.token)
    localStorage.removeItem(storageKeys.nombre)
    localStorage.removeItem(storageKeys.apellido)
    localStorage.removeItem(storageKeys.email)
  }

  const value = useMemo(
    () => ({
      token,
      nombre,
      apellido,
      email,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, nombre, apellido, email],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
