import { useState } from 'react'
import RegisterView from './components/RegisterView'
import LoginView from './components/LoginView'

function App() {
  const [view, setView] = useState<'login' | 'register'>('login')

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
