import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { token, nombre, apellido, email, logout } = useAuth()

  return (
    <main className="min-h-screen bg-white p-4 font-sans text-black">
      <h1 className="text-[30px] font-bold leading-tight">Dashboard</h1>
      <p className="mt-1 text-[20px] leading-tight">
        <strong>Token:</strong>Bearer {token}
      </p>
      <p className="mt-1 text-[20px] leading-tight">
        <strong>Nombres:</strong> {nombre} {apellido}
      </p>
      <p className="mt-1 text-[20px] leading-tight">
        <strong>Email:</strong>{email}
      </p>
      <button
        type="button"
        onClick={logout}
        className="mt-6 px-5 py-1 text-[20px] text-white"
        style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
      >
        Cerrar sesión
      </button>
    </main>
  )
}
