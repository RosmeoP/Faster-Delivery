import { useState } from 'react'

interface LoginViewProps {
  onNavigateToRegister: () => void
}

export default function LoginView({ onNavigateToRegister }: LoginViewProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login enviado:', { email, password, rememberMe })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-gray-900">
      {/* Faster Delivery Original Top Bar */}
      <header className="w-full border-b border-gray-100 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 py-5 flex justify-between items-center">
          <div className="text-[17px] font-medium text-gray-900 cursor-pointer" onClick={onNavigateToRegister}>
            Faster Delivery
          </div>
          <nav className="flex items-center gap-6">
            <a href="#inicio" className="text-[15px] font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Inicio
            </a>
            <a href="#informacion" className="text-[15px] font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Informacion
            </a>
            <a href="#comunidad" className="text-[15px] font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Comunidad
            </a>
          </nav>
        </div>
      </header>

      {/* Login Form Main Container */}
      <main className="flex-1 flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-[400px] flex flex-col items-center">
          <h1 className="text-[32px] font-bold text-gray-900 tracking-tight mb-1 text-center">
            Bienvenido
          </h1>
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors mb-9"
          >
            Crear nueva cuenta
          </button>

          <form onSubmit={handleLoginSubmit} className="w-full flex flex-col gap-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Usuario o correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-[15px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all"
                required
              />
            </div>

            <div className="w-full">
              <input
                type="password"
                placeholder="Contrasenia"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-[15px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all"
                required
              />
            </div>

            <div className="flex justify-between items-center w-full mt-1 mb-3">
              <label className="flex items-center gap-2 text-[14px] text-gray-700 cursor-pointer select-none font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                Recuerdame
              </label>
              <a
                href="#olvide-contrasenia"
                className="text-[14px] font-semibold text-blue-700 hover:text-blue-800 transition-colors hover:underline"
              >
                Olvide la contrasenia
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-[50px] bg-[#1e3a8a] text-white rounded-lg text-[15px] font-semibold hover:bg-[#172554] active:scale-[0.985] transition-all cursor-pointer"
            >
              Loguearse
            </button>

            <button
              type="button"
              onClick={onNavigateToRegister}
              className="w-full h-[50px] bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-lg text-[15px] font-semibold active:scale-[0.985] transition-all cursor-pointer mt-1"
            >
              Crear cuenta / Registrarse
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
