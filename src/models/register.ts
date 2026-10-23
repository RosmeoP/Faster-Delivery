export interface Register {
  nombre: string
  apellido: string
  telefono: string
  correo: string
  contrasena: string
}

export interface RegisterForm extends Register {
  confirmarContrasena: string
}

export const emptyRegisterForm: RegisterForm = {
  nombre: '',
  apellido: '',
  telefono: '',
  correo: '',
  contrasena: '',
  confirmarContrasena: '',
}

export function registerFromForm(form: RegisterForm): Register {
  return {
    nombre: form.nombre,
    apellido: form.apellido,
    telefono: form.telefono,
    correo: form.correo,
    contrasena: form.contrasena,
  }
}
