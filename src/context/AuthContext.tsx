import { useMemo, useState, type ReactNode } from 'react'
import { userFromLoginResponse, type LoginResponse, type User } from '../models/user'
import { AuthContext } from './authContextValue'

const storageKeys = {
  token: 'authToken',
  nombre: 'authNombre',
  apellido: 'authApellido',
  email: 'authEmail',
}

function userFromStorage(): User | null {
  const nombre = localStorage.getItem(storageKeys.nombre)
  const apellido = localStorage.getItem(storageKeys.apellido)
  const correo = localStorage.getItem(storageKeys.email)

  if (!nombre && !apellido && !correo) {
    return null
  }

  return {
    nombre: nombre ?? '',
    apellido: apellido ?? '',
    correo: correo ?? '',
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(storageKeys.token))
  const [user, setUser] = useState<User | null>(userFromStorage)

  const login = (response: LoginResponse) => {
    const nextUser = userFromLoginResponse(response)
    setToken(response.token)
    setUser(nextUser)
    localStorage.setItem(storageKeys.token, response.token)
    localStorage.setItem(storageKeys.nombre, nextUser.nombre)
    localStorage.setItem(storageKeys.apellido, nextUser.apellido)
    localStorage.setItem(storageKeys.email, nextUser.correo)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(storageKeys.token)
    localStorage.removeItem(storageKeys.nombre)
    localStorage.removeItem(storageKeys.apellido)
    localStorage.removeItem(storageKeys.email)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
