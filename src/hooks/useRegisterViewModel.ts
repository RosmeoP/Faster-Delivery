import { useState, type ChangeEvent, type FormEvent } from 'react'
import { registerService, type RegisterPayload } from '../services/registerService'

type RegisterForm = RegisterPayload & { confirmarContrasena: string }

const initialForm: RegisterForm = {
  nombre: '',
  apellido: '',
  telefono: '',
  correo: '',
  contrasena: '',
  confirmarContrasena: '',
}

export function useRegisterViewModel() {
  const [form, setForm] = useState<RegisterForm>(initialForm)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const validate = () => {
    if (Object.values(form).some((value) => !value.trim())) {
      return 'Todos los campos son obligatorios.'
    }

    if (form.contrasena !== form.confirmarContrasena) {
      return 'Las contraseñas no coinciden.'
    }

    return ''
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationError = validate()

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setIsLoading(true)
      setError('')
      const payload: RegisterPayload = {
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono,
        correo: form.correo,
        contrasena: form.contrasena,
      }
      const response = await registerService(payload)
      console.log(response)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ocurrió un error al registrar la cuenta.')
    } finally {
      setIsLoading(false)
    }
  }

  return { form, error, isLoading, handleChange, handleSubmit }
}
