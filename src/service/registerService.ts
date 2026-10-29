import { apiRequest } from '../api/http'
import type { Register } from '../models/register'

export async function registerService(payload: Register) {
  try {
    return await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'No fue posible crear la cuenta.', { cause: error })
  }
}
