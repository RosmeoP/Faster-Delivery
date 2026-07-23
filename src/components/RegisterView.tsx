import { useState } from 'react'

interface RegisterViewProps {
  onNavigateToLogin: () => void
}

export default function RegisterView({ onNavigateToLogin }: RegisterViewProps) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registro enviado:', { nombre, email, password })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-gray-900">
      {/* Rosmeo Top Bar */}
      <header className="w-full border-b border-gray-100 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div className="text-[17px] font-semibold text-gray-800 tracking-tight cursor-pointer">
              Rosmeo
            </div>
            <nav className="flex items-center gap-7">
              <a href="#explorar" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Explorar
              </a>
              <a href="#ofertas" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Ofertas
              </a>
              <a href="#historia" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Historia
              </a>
              <a href="#ayuda" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Ayuda
              </a>
            </nav>
          </div>

          <button
            onClick={onNavigateToLogin}
            className="bg-[#5b3bf4] hover:bg-[#4c2ee3] text-white px-6 py-2.5 rounded-xl text-[14px] font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            Loguearse
          </button>
        </div>
      </header>

      {/* Register Form Main Container */}
      <main className="flex-1 flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-[460px] bg-white rounded-2xl border border-gray-800/80 p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-tight mb-2">
            Crear una cuenta
          </h1>
          <p className="text-[15px] text-gray-600 font-medium mb-8">
            Crea tu cuenta y disfruta de las promociones recientes
          </p>

          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="nombre" className="block text-[11px] font-extrabold text-gray-900 tracking-wider mb-2 uppercase">
                NOMBRE COMPLETO
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Registra tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-lg text-[15px] placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-extrabold text-gray-900 tracking-wider mb-2 uppercase">
                DIRECCION DE CORREO ELECTRONICO
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-lg text-[15px] placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-extrabold text-gray-900 tracking-wider mb-2 uppercase">
                CONTRASENIA
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digita tu contrasenia"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-lg text-[15px] placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-3 bg-[#1d3bbd] hover:bg-[#1932a3] text-white font-semibold rounded-lg text-[15px] transition-all duration-150 active:scale-[0.99] cursor-pointer shadow-sm flex items-center justify-center"
            >
              Crear cuenta
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              ¿Ya tienes cuenta? <span className="text-blue-700 font-semibold underline">Iniciar sesión</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
