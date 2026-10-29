import { createContext } from 'react'
import type { LoginResponse, User } from '../models/user'

export interface AuthContextValue {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (response: LoginResponse) => void
  logout: () => void
  updateUser: (updatedData: Partial<User>) => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
