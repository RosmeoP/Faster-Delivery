import { useState, type FormEvent } from 'react'

interface CategoryDraft {
  name: string
  description: string
}

export function useCategoryViewModel(onCreate: (category: CategoryDraft) => void) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const reset = () => {
    setName('')
    setDescription('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    onCreate({
      name: trimmedName,
      description: description.trim(),
    })
    reset()
  }

  return {
    name,
    setName,
    description,
    setDescription,
    reset,
    handleSubmit,
  }
}
