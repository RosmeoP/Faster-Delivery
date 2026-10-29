import { apiRequest } from '../api/http'
import type { LoginCredentials, LoginResponse } from '../models/user'

export async function loginService(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    return await apiRequest<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'No fue posible iniciar sesión.', { cause: error })
  }
}
