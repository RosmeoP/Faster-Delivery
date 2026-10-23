import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  createProduct,
  getCategories,
  type Category,
  type CreatedProduct,
  type CreateProductPayload,
} from '../service/productService'

export interface ProductDraft {
  name: string
  categoryId: string
  sku: string
  description: string
  regularPrice: string
  salePrice: string
  stock: string
  minStock: string
}

const initialState: ProductDraft = {
  name: '',
  categoryId: '',
  sku: '',
  description: '',
  regularPrice: '',
  salePrice: '',
  stock: '',
  minStock: '',
}

const DESCRIPTION_MAX = 2000

function toPayload(form: ProductDraft): CreateProductPayload {
  return {
    name: form.name.trim(),
    categoryId: Number(form.categoryId),
    sku: form.sku.trim() || null,
    description: form.description.trim(),
    regularPrice: Number(form.regularPrice),
    salePrice: form.salePrice ? Number(form.salePrice) : null,
    stock: Number(form.stock) || 0,
    minStock: Number(form.minStock) || 0,
  }
}

export function useProductFormViewModel(onSuccess?: (product: CreatedProduct) => void) {
  const [form, setForm] = useState<ProductDraft>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof ProductDraft, string>>>({})
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    getCategories()
      .then((data) => {
        if (active) setCategories(data)
      })
      .catch((error: unknown) => {
        if (active)
          setCategoriesError(error instanceof Error ? error.message : 'No se pudieron cargar las categorías')
      })
      .finally(() => {
        if (active) setCategoriesLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ProductDraft]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductDraft, string>> = {}
    if (!form.name.trim()) newErrors.name = 'El nombre del producto es requerido'
    if (!form.categoryId) newErrors.categoryId = 'Selecciona una categoría'
    if (!form.regularPrice || Number(form.regularPrice) <= 0)
      newErrors.regularPrice = 'Ingresa un precio válido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const reset = () => {
    setForm(initialState)
    setErrors({})
    setSubmitError(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const created = await createProduct(toPayload(form))
      reset()
      onSuccess?.(created)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo crear el producto')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    form,
    errors,
    categories,
    categoriesLoading,
    categoriesError,
    submitting,
    submitError,
    descriptionMax: DESCRIPTION_MAX,
    handleChange,
    reset,
    handleSubmit,
  }
}
