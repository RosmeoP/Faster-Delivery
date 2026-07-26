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
      {/* Header Bar */}
      <header className="w-full bg-white py-6 px-8 sm:px-12">
        <div className="max-w-[1300px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div 
              className="text-[19px] font-bold text-black tracking-tight cursor-pointer select-none"
              onClick={onNavigateToRegister}
            >
              Faster Delivery
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#explorar" className="text-[15px] font-medium text-gray-700 hover:text-black transition-colors">
                Explorar
              </a>
              <a href="#ofertas" className="text-[15px] font-medium text-gray-700 hover:text-black transition-colors">
                Ofertas
              </a>
              <a href="#historia" className="text-[15px] font-medium text-gray-700 hover:text-black transition-colors">
                Historia
              </a>
              <a href="#ayuda" className="text-[15px] font-medium text-gray-700 hover:text-black transition-colors">
                Ayuda
              </a>
            </nav>
          </div>

          <button
            onClick={onNavigateToRegister}
            className="bg-[#5037ed] hover:bg-[#432bd8] text-white px-6 py-2.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer shadow-sm"
          >
            Registrarse
          </button>
        </div>
      </header>

      {/* Login Main Area */}
      <main className="flex-1 flex justify-center items-center px-4 -mt-12">
        <div className="w-full max-w-[390px] flex flex-col items-center">
          <h1 className="text-[34px] font-extrabold text-black tracking-tight mb-1 text-center">
            Bienvenido
          </h1>
          
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="text-[14px] font-medium text-gray-700 hover:text-black transition-colors mb-7 text-center cursor-pointer"
          >
            Crear nueva cuenta
          </button>

          <form onSubmit={handleLoginSubmit} className="w-full flex flex-col gap-3.5">
            <div className="w-full">
              <input
                type="text"
                placeholder="Usuario o correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[48px] px-4 border border-gray-300 rounded-xl text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                required
              />
            </div>

            <div className="w-full">
              <input
                type="password"
                placeholder="Contrasenia"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[48px] px-4 border border-gray-300 rounded-xl text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                required
              />
            </div>

            <div className="flex justify-between items-center w-full mt-1 mb-2">
              <label className="flex items-center gap-2.5 text-[14px] text-gray-900 cursor-pointer select-none font-semibold">
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
                className="text-[14px] font-bold text-[#1d4ed8] hover:text-blue-800 transition-colors"
              >
                Olvide la contrasenia
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-[48px] bg-[#1d3bbd] hover:bg-[#17309e] text-white rounded-xl text-[15px] font-semibold active:scale-[0.99] transition-all cursor-pointer shadow-sm"
            >
              Loguearse
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
