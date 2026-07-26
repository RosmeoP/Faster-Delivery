import { useState } from 'react'

interface RegisterViewProps {
  onNavigateToLogin: () => void
}

export default function RegisterView({ onNavigateToLogin }: RegisterViewProps) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [direccion, setDireccion] = useState('')

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registro enviado:', { nombre, email, password, direccion })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-gray-900">
      {/* Header Bar */}
      <header className="w-full bg-white py-6 px-8 sm:px-12">
        <div className="max-w-[1300px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div 
              className="text-[19px] font-bold text-black tracking-tight cursor-pointer select-none"
              onClick={onNavigateToLogin}
            >
              Rosmeo
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
            onClick={onNavigateToLogin}
            className="bg-[#5037ed] hover:bg-[#432bd8] text-white px-6 py-2.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer shadow-sm"
          >
            Loguearse
          </button>
        </div>
      </header>

      {/* Register Main Container */}
      <main className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-[470px] bg-white rounded-[22px] border border-gray-400/80 p-8 sm:p-10 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
          <h1 className="text-[30px] font-black text-black tracking-tight leading-tight mb-1.5">
            Crear una cuenta
          </h1>
          <p className="text-[14px] text-gray-700 font-medium mb-7">
            Crea tu cuenta y disfruta de las promociones recientes
          </p>

          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="nombre" className="block text-[11px] font-black text-gray-900 tracking-wider mb-2 uppercase">
                NOMBRE COMPLETO
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Registra tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-black text-gray-900 tracking-wider mb-2 uppercase">
                DIRECCION DE CORREO ELECTRONICO
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-black text-gray-900 tracking-wider mb-2 uppercase">
                CONTRASENIA
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digita tu contrasenia"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="direccion" className="block text-[11px] font-black text-gray-900 tracking-wider mb-2 uppercase">
                DIRECCION DE ENVIO PRINCIPAL
              </label>
              <input
                id="direccion"
                type="text"
                placeholder="Ciudad, Provincia, Urbanizacion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-3 bg-[#1d3bbd] hover:bg-[#17309e] text-white font-semibold rounded-xl text-[15px] shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer flex items-center justify-center"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
