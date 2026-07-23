import { useState } from 'react'
import RegisterView from './components/RegisterView'
import LoginView from './components/LoginView'

function App() {
  const [view, setView] = useState<'register' | 'login'>('register')

  return (
    <>
      {view === 'register' ? (
        <RegisterView onNavigateToLogin={() => setView('login')} />
      ) : (
        <LoginView onNavigateToRegister={() => setView('register')} />
      )}
    </>
  )
}

export default App
