import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  Barcode,
  CheckCircle2,
  DollarSign,
  Package,
  Tag,
} from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { useProductFormViewModel } from '../viewmodels/useProductFormViewModel'

const CATEGORIES = [
  'Fast Food',
  'Healthy',
  'Desserts',
  'Beverages',
  'Calzado Urbano',
  'Comida',
  'Ropa urbana',
]

export const ProductForm: FC = () => {
  const navigate = useNavigate()
  const { addProduct } = useProducts()
  const { form, errors, descriptionMax, handleChange, reset, handleSubmit } =
    useProductFormViewModel((draft) => {
      addProduct(draft)
      navigate('/')
    })

  const descLen = form.description.length

  return (
    <section className="px-4 py-8 sm:px-8">
      {/* ── Page heading ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Crear nuevo producto
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Completa la información para registrar un nuevo artículo en el
          catálogo de inventario.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="max-w-3xl space-y-6">
        {/* ══════════════════════════════════════════
            TARJETA 1 – INFORMACIÓN GENERAL
        ══════════════════════════════════════════ */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Card header */}
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-6 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-[#5b35f5]">
              <Package size={18} />
            </span>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Información General del Producto
              </h2>
              <p className="text-xs text-slate-500">
                Datos principales de identificación
              </p>
            </div>
          </div>

          <div className="space-y-5 px-6 py-6">
            {/* Nombre */}
            <div>
              <label
                htmlFor="product-name"
                className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
              >
                Nombre del Producto <span className="text-red-400">*</span>
              </label>
              <input
                id="product-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej. Hamburguesa Wagyu Especial"
                required
                className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-slate-200 focus:border-violet-400 focus:ring-violet-100'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Categoría */}
            <div>
              <label
                htmlFor="product-category"
                className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
              >
                Categoría <span className="text-red-400">*</span>
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400">
                  <Tag size={15} />
                </span>
                <select
                  id="product-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full appearance-none rounded-xl border py-2.5 pr-4 pl-9 text-sm text-slate-800 focus:outline-none focus:ring-2 transition-colors ${
                    errors.category
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:border-violet-400 focus:ring-violet-100'
                  } ${form.category === '' ? 'text-slate-400' : 'text-slate-800'}`}
                >
                  <option value="" disabled>
                    Selecciona una categoría…
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Código de Barra */}
            <div>
              <label
                htmlFor="product-barcode"
                className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
              >
                Código de Barra
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400">
                  <Barcode size={15} />
                </span>
                <input
                  id="product-barcode"
                  type="text"
                  name="barcode"
                  value={form.barcode}
                  onChange={handleChange}
                  placeholder="Ej. 7501031311309"
                  className="w-full rounded-xl border border-slate-200 py-2.5 pr-4 pl-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                Código interno de inventario (opcional)
              </p>
            </div>

            {/* Descripción */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="product-description"
                  className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
                >
                  Descripción Detallada
                </label>
                <span
                  className={`text-xs font-medium tabular-nums ${
                    descLen > descriptionMax * 0.9
                      ? 'text-amber-500'
                      : 'text-slate-400'
                  }`}
                >
                  {descLen} / {descriptionMax}
                </span>
              </div>
              <textarea
                id="product-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                maxLength={descriptionMax}
                placeholder="Describe ingredientes, presentación, alérgenos u otras características relevantes…"
                rows={5}
                className="mt-2 min-h-[120px] w-full resize-y rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors"
              />
              {/* Warning for delivery drivers */}
              <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
                <AlertTriangle
                  size={14}
                  className="mt-0.5 shrink-0 text-amber-500"
                />
                <p className="text-xs text-amber-700">
                  <strong>Aviso para repartidores:</strong> Esta descripción
                  será visible en el detalle del pedido. Incluye información
                  relevante para la entrega (fragilidad, temperatura, etc.).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            TARJETA 2 – PRECIOS E INVENTARIO
        ══════════════════════════════════════════ */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Card header */}
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-6 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <DollarSign size={18} />
            </span>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Precios e Inventario
              </h2>
              <p className="text-xs text-slate-500">
                Define el valor y existencias del producto
              </p>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Precio Regular */}
              <div>
                <label
                  htmlFor="product-regular-price"
                  className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
                >
                  Precio Regular <span className="text-red-400">*</span>
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-medium text-slate-400">
                    $
                  </span>
                  <input
                    id="product-regular-price"
                    type="number"
                    name="regularPrice"
                    value={form.regularPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full rounded-xl border py-2.5 pr-4 pl-7 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.regularPrice
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                        : 'border-slate-200 focus:border-emerald-400 focus:ring-emerald-100'
                    }`}
                  />
                </div>
                {errors.regularPrice && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.regularPrice}
                  </p>
                )}
              </div>

              {/* Precio Oferta */}
              <div>
                <label
                  htmlFor="product-sale-price"
                  className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
                >
                  Precio Oferta
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-medium text-slate-400">
                    $
                  </span>
                  <input
                    id="product-sale-price"
                    type="number"
                    name="salePrice"
                    value={form.salePrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full rounded-xl border border-slate-200 py-2.5 pr-4 pl-7 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-400">
                  Dejar en blanco si no aplica descuento
                </p>
              </div>

              {/* Stock Inicial */}
              <div>
                <label
                  htmlFor="product-initial-stock"
                  className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
                >
                  Stock Inicial
                </label>
                <input
                  id="product-initial-stock"
                  type="number"
                  name="initialStock"
                  value={form.initialStock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="1"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  Unidades disponibles al registrar
                </p>
              </div>

              {/* Stock Mínimo */}
              <div>
                <label
                  htmlFor="product-min-stock"
                  className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase"
                >
                  Stock Mínimo
                </label>
                <input
                  id="product-min-stock"
                  type="number"
                  name="minStock"
                  value={form.minStock}
                  onChange={handleChange}
                  placeholder="5"
                  min="0"
                  step="1"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  Alerta de inventario bajo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Form actions ── */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <button
            type="button"
            onClick={() => {
              reset()
              navigate('/')
            }}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:border-slate-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            id="btn-create-product"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#5b35f5] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4c28e0] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
          >
            <CheckCircle2 size={16} />
            Crear Producto
          </button>
        </div>
      </form>
    </section>
  )
}
