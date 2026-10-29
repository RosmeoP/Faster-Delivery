import { useMemo, useState, type ReactNode } from 'react'
import { userFromLoginResponse, type LoginResponse, type User } from '../models/user'
import { AuthContext } from './authContextValue'

const storageKeys = {
  token: 'authToken',
  nombre: 'authNombre',
  apellido: 'authApellido',
  email: 'authEmail',
  phone: 'authPhone',
}

function userFromStorage(): User | null {
  const nombre = localStorage.getItem(storageKeys.nombre)
  const apellido = localStorage.getItem(storageKeys.apellido)
  const correo = localStorage.getItem(storageKeys.email)
  const telefono = localStorage.getItem(storageKeys.phone)

  if (!nombre && !apellido && !correo) {
    return null
  }

  return {
    nombre: nombre ?? '',
    apellido: apellido ?? '',
    correo: correo ?? '',
    telefono: telefono ?? '',
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
    localStorage.setItem(storageKeys.phone, nextUser.telefono ?? '')
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(storageKeys.token)
    localStorage.removeItem(storageKeys.nombre)
    localStorage.removeItem(storageKeys.apellido)
    localStorage.removeItem(storageKeys.email)
    localStorage.removeItem(storageKeys.phone)
  }

  const updateUser = (updatedData: Partial<User>) => {
    setUser((prev) => {
      const next: User = {
        nombre: updatedData.nombre !== undefined ? updatedData.nombre : prev?.nombre ?? '',
        apellido: updatedData.apellido !== undefined ? updatedData.apellido : prev?.apellido ?? '',
        correo: updatedData.correo !== undefined ? updatedData.correo : prev?.correo ?? '',
        telefono: updatedData.telefono !== undefined ? updatedData.telefono : prev?.telefono ?? '',
      }
      localStorage.setItem(storageKeys.nombre, next.nombre)
      localStorage.setItem(storageKeys.apellido, next.apellido)
      localStorage.setItem(storageKeys.email, next.correo)
      localStorage.setItem(storageKeys.phone, next.telefono ?? '')
      return next
    })
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
      updateUser,
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
