export interface RegisterPayload {
  nombre: string
  apellido: string
  telefono: string
  correo: string
  contrasena: string
}

export async function registerService(payload: RegisterPayload) {
  const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const contentType = response.headers.get('content-type') ?? ''
  const data: unknown = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
        ? data.message
        : 'No fue posible crear la cuenta.'
    throw new Error(message)
  }

  return data
}
