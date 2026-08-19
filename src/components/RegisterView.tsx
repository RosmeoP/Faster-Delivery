import { useRegisterViewModel } from '../hooks/useRegisterViewModel'

interface RegisterViewProps {
  onNavigateToLogin: () => void
}

const fields = [
  { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ingresa tu nombre' },
  { name: 'apellido', label: 'Apellido', type: 'text', placeholder: 'Ingresa tu apellido' },
  { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: 'Ingresa tu teléfono' },
  { name: 'correo', label: 'Correo electrónico', type: 'email', placeholder: 'example@gmail.com' },
  { name: 'contrasena', label: 'Contraseña', type: 'password', placeholder: 'Crea una contraseña' },
  { name: 'confirmarContrasena', label: 'Confirmar contraseña', type: 'password', placeholder: 'Confirma tu contraseña' },
] as const

export default function RegisterView({ onNavigateToLogin }: RegisterViewProps) {
  const { form, error, isLoading, handleChange, handleSubmit } = useRegisterViewModel()

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased">
      <header className="w-full bg-white px-8 py-6 sm:px-12">
        <div className="mx-auto flex max-w-[1300px] items-center justify-between">
          <button type="button" onClick={onNavigateToLogin} className="text-[19px] font-bold tracking-tight">
            Faster Delivery
          </button>
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="rounded-xl bg-[#5037ed] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#432bd8]"
          >
            Loguearse
          </button>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-4 py-8">
        <div className="w-full max-w-[470px] rounded-[22px] border border-gray-300 bg-white p-8 shadow-[0_12px_32px_rgba(0,0,0,0.06)] sm:p-10">
          <h1 className="mb-1.5 text-[30px] font-black leading-tight tracking-tight">Crear una cuenta</h1>
          <p className="mb-7 text-[14px] font-medium text-gray-700">Completa tus datos para registrarte.</p>

          <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="mb-2 block text-[11px] font-black uppercase tracking-wider text-gray-900">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 text-[14px] text-gray-900 placeholder-gray-400 transition-all focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
            ))}

            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-[#1d3bbd] text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#17309e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
