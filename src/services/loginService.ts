import type { LoginResponse } from '../context/authContextValue'

interface LoginCredentials {
  correo: string
  contrasena: string
}

export async function loginService(credentials: LoginCredentials): Promise<LoginResponse> {
  const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  const data: unknown = await response.json()

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
        ? data.message
        : 'No fue posible iniciar sesión.'
    throw new Error(message)
  }

  return data as LoginResponse
}
