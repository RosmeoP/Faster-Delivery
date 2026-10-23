export interface User {
  nombre: string
  apellido: string
  correo: string
  telefono?: string
}

export interface LoginCredentials {
  correo: string
  contrasena: string
}

export interface LoginResponse {
  token: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
}

export function userFromLoginResponse(response: LoginResponse): User {
  return {
    nombre: response.user.firstName,
    apellido: response.user.lastName,
    correo: response.user.email,
  }
}
