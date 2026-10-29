import { apiRequest } from '../api/http'

export interface UpdateProfilePayload {
  nombre: string
  apellido: string
  correo: string
  telefono?: string
}

export interface UpdateProfileResponse {
  message: string
  user: {
    firstName: string
    lastName: string
    email: string
    phone?: string
  }
}

export function updateProfileService(payload: UpdateProfilePayload): Promise<UpdateProfileResponse> {
  return apiRequest<UpdateProfileResponse>('/api/user/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
