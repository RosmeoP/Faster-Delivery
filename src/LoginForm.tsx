import { useState } from 'react'
import RegisterView from './components/RegisterView'
import LoginView from './components/LoginView'
import Dashboard from './components/Dashboard'
import { useAuth } from './hooks/useAuth'

function App() {
  const [view, setView] = useState<'login' | 'register'>('login')
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Dashboard />
  }

  return (
    <>
      {view === 'login' ? (
        <LoginView onNavigateToRegister={() => setView('register')} />
      ) : (
        <RegisterView onNavigateToLogin={() => setView('login')} />
      )}
    </>
  )
}

export default App
