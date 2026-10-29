import type { FC } from 'react'
import { useState } from 'react'
import { User as UserIcon } from 'lucide-react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { CategoryManager } from '../components/CategoryManager'
import { Drawer } from '../components/Drawer'
import { ProductCard } from '../components/productCard'
import { ProductForm } from '../components/ProductForm'
import { UserProfile } from '../components/UserProfile'
import { useProducts } from '../context/ProductsContext'
import { useAuth } from '../core/useAuth'

const DashboardPage: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [categoryManagerOpen, setCategoryManagerOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All categorias')
  const [extraCategories, setExtraCategories] = useState<string[]>([])
  const { logout, user } = useAuth()
  const { products } = useProducts()
  const navigate = useNavigate()
  const location = useLocation()

  const displayName = [user?.nombre, user?.apellido].filter(Boolean).join(' ').toUpperCase()
  const visibleProducts =
    activeFilter === 'All categorias' ? products : products.filter((product) => product.category === activeFilter)

  const handleCreateCategory = (category: { name: string }) => {
    setExtraCategories((current) => (current.includes(category.name) ? current : [...current, category.name]))
  }

  const pageTitle =
    location.pathname === '/profile'
      ? 'Perfil de Usuario'
      : location.pathname === '/products/create'
        ? 'Crear Producto'
        : categoryManagerOpen
          ? 'Gestión de Categorías'
          : 'Catalogo de productos'

  return (
    <div className="min-h-screen bg-[#f7f8fb]">
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeFilter={activeFilter}
        extraCategories={extraCategories}
        onOpenCategoryManager={() => {
          setCategoryManagerOpen(true)
          navigate('/')
        }}
        onSelectFilter={(label) => {
          setActiveFilter(label)
          setCategoryManagerOpen(false)
          navigate('/')
        }}
        onNavigateToCreate={() => setCategoryManagerOpen(false)}
      />
      <main className="md:ml-64">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setIsDrawerOpen(true)}
              className="cursor-pointer rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="truncate text-[17px] font-semibold text-slate-900">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setCategoryManagerOpen(false)
                navigate('/profile')
              }}
              title="Ver mi perfil"
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 transition-colors hover:bg-slate-50"
            >
              <UserIcon size={18} strokeWidth={1.8} className="text-black" />
              <span className="text-[13px] font-bold tracking-wide text-black uppercase">
                {displayName || 'FERNANDO ALEXIS'}
              </span>
            </button>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer rounded-md bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
            >
              Cerrar sesion
            </button>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              categoryManagerOpen ? (
                <CategoryManager
                  onCreate={handleCreateCategory}
                  onCancel={() => setCategoryManagerOpen(false)}
                />
              ) : (
                <section className="p-6">
                  <div className="mb-8">
                    <h2 className="text-2xl font-normal text-slate-800">
                      Comida lista para entregar a la puerta de tu casa
                    </h2>
                    <p className="mt-2 text-slate-600">
                      Descubre los mejores productos para ti, {user?.nombre}
                    </p>
                  </div>
                  {visibleProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                      {visibleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      No hay productos en esta categoria.
                    </p>
                  )}
                </section>
              )
            }
          />
          <Route
            path="/products/create"
            element={<ProductForm />}
          />
          <Route
            path="/profile"
            element={<UserProfile />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default DashboardPage
