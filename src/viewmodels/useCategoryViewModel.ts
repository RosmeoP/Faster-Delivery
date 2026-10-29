import { useState, type FormEvent } from 'react'
import { createCategory } from '../service/productService'

interface CategoryDraft {
  name: string
  description: string
}

export function useCategoryViewModel(onCreate: (category: CategoryDraft) => void) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = () => {
    setName('')
    setDescription('')
    setError(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    setIsSubmitting(true)
    setError(null)

    try {
      await createCategory({
        name: trimmedName,
        description: description.trim(),
      })
    } catch {
      // Local addition proceeds even if server is offline
    } finally {
      setIsSubmitting(false)
      onCreate({
        name: trimmedName,
        description: description.trim(),
      })
      reset()
    }
  }

  return {
    name,
    setName,
    description,
    setDescription,
    isSubmitting,
    error,
    reset,
    handleSubmit,
  }
}
