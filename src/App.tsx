import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { useAuth } from './core/useAuth'
import { ProductsProvider } from './context/ProductsContext'
import Dashboard from './pages/Dashboard'
import LoginView from './pages/LoginView'
import RegisterView from './pages/RegisterView'

function App() {
  const [view, setView] = useState<'login' | 'register'>('login')
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <ProductsProvider>
          <Dashboard />
        </ProductsProvider>
      </BrowserRouter>
    )
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
