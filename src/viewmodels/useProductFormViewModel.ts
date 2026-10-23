import { useState, type ChangeEvent, type FormEvent } from 'react'

export interface ProductDraft {
  name: string
  category: string
  barcode: string
  description: string
  regularPrice: string
  salePrice: string
  initialStock: string
  minStock: string
}

const initialState: ProductDraft = {
  name: '',
  category: '',
  barcode: '',
  description: '',
  regularPrice: '',
  salePrice: '',
  initialStock: '',
  minStock: '',
}

const DESCRIPTION_MAX = 2000

export function useProductFormViewModel(onSuccess?: (draft: ProductDraft) => void) {
  const [form, setForm] = useState<ProductDraft>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof ProductDraft, string>>>({})

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
    if (!form.category) newErrors.category = 'Selecciona una categoría'
    if (!form.regularPrice || Number(form.regularPrice) <= 0)
      newErrors.regularPrice = 'Ingresa un precio válido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const reset = () => {
    setForm(initialState)
    setErrors({})
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    onSuccess?.(form)
    reset()
  }

  return {
    form,
    errors,
    descriptionMax: DESCRIPTION_MAX,
    handleChange,
    reset,
    handleSubmit,
  }
}
