import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cake, Coffee, FolderPlus, LayoutGrid, PackagePlus, Pizza, Salad, Tag, type LucideIcon } from 'lucide-react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  activeFilter: string
  extraCategories: string[]
  onOpenCategoryManager: () => void
  onSelectFilter: (label: string) => void
  onNavigateToCreate?: () => void
}

const filters: { label: string; icon: LucideIcon }[] = [
  { label: 'All categorias', icon: LayoutGrid },
  { label: 'Fast Food', icon: Pizza },
  { label: 'Healthy', icon: Salad },
  { label: 'Desserts', icon: Cake },
  { label: 'Beverages', icon: Coffee },
]

export const Drawer: FC<DrawerProps> = ({
  open,
  onClose,
  activeFilter,
  extraCategories,
  onOpenCategoryManager,
  onSelectFilter,
  onNavigateToCreate,
}) => {
  const navigate = useNavigate()
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Cerrar menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/50 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition-transform md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <div>
            <p className="text-xs font-medium text-slate-500">Delivery</p>
            <h2 className="text-lg font-bold text-slate-900">Categorias</h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar menu"
            onClick={onClose}
            className="cursor-pointer rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden"
          >
            X
          </button>
        </div>

        <nav className="p-4">
          <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Gestion</p>
          <button
            type="button"
            onClick={() => {
              onOpenCategoryManager()
              onClose()
            }}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm text-slate-600 transition-colors hover:bg-slate-100"
          >
            <FolderPlus size={16} />
            Crear Categoria
          </button>

          <button
            type="button"
            id="drawer-btn-crear-producto"
            onClick={() => {
              onNavigateToCreate?.()
              navigate('/products/create')
              onClose()
            }}
            className="mb-6 mt-2 flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm text-slate-600 transition-colors hover:bg-slate-100"
          >
            <PackagePlus size={16} />
            Crear Producto
          </button>

          <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Filters</p>
          <ul className="space-y-1">
            {filters.map((item) => {
              const Icon = item.icon
              const selected = item.label === activeFilter

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectFilter(item.label)
                      onClose()
                    }}
                    className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors ${
                      selected ? 'bg-cyan-100 font-medium text-slate-800' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                </li>
              )
            })}
            {extraCategories.map((label) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectFilter(label)
                    onClose()
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors ${
                    label === activeFilter
                      ? 'bg-cyan-100 font-medium text-slate-800'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Tag size={16} />
                  <span className="truncate">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
