import type { FC } from 'react'
import { useCategoryViewModel } from '../viewmodels/useCategoryViewModel'

interface CategoryManagerProps {
  onCreate: (category: { name: string; description: string }) => void
}

export const CategoryManager: FC<CategoryManagerProps> = ({ onCreate }) => {
  const { name, setName, description, setDescription, reset, handleSubmit } = useCategoryViewModel(onCreate)

  return (
    <section className="px-6 py-8 sm:px-8">
      <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Gestion de Categorias</h2>
      <p className="mt-1 text-sm text-slate-500">
        Administra, define y segmenta las opciones de productos para tus restaurantes y clientes
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-base font-semibold text-slate-900">Crear categoria</h3>
          <p className="mt-1 text-sm text-slate-500">Define los datos principales de la nueva seccion</p>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div>
            <label
              htmlFor="category-name"
              className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
            >
              Nombre de la categoria
            </label>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej. Pizza Artesanales"
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
            >
              Descripcion
            </label>
            <textarea
              id="category-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe los productos incluidos en esta categoria"
              rows={5}
              className="mt-2 min-h-36 w-full resize-y rounded-md border border-violet-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-[#5b35f5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4c28e0]"
          >
            Crear Categoria
          </button>
        </div>
      </form>
    </section>
  )
}
