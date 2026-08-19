import { createContext } from 'react'

export interface LoginResponse {
  token: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
}

export interface AuthContextValue {
  token: string | null
  nombre: string
  apellido: string
  email: string
  isAuthenticated: boolean
  login: (response: LoginResponse) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
