import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useAuth } from '../core/useAuth'
import { updateProfileService } from '../service/profileService'

export type ProfileTab = 'personal' | 'direcciones' | 'pagos' | 'pedidos'

export interface ProfileFormData {
  nombre: string
  apellido: string
  correo: string
  telefono: string
}

export function useUserProfileViewModel() {
  const { user, updateUser } = useAuth()

  const [activeTab, setActiveTab] = useState<ProfileTab>('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [localOverrides, setLocalOverrides] = useState<Partial<ProfileFormData>>({})

  const [isSaving, setIsSaving] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const formData: ProfileFormData = {
    nombre: localOverrides.nombre !== undefined ? localOverrides.nombre : (user?.nombre ?? ''),
    apellido: localOverrides.apellido !== undefined ? localOverrides.apellido : (user?.apellido ?? ''),
    correo: localOverrides.correo !== undefined ? localOverrides.correo : (user?.correo ?? ''),
    telefono: localOverrides.telefono !== undefined ? localOverrides.telefono : (user?.telefono ?? ''),
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalOverrides((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditToggle = () => {
    if (isEditing) {
      void handleSave()
    } else {
      setIsEditing(true)
      setFeedbackMessage(null)
    }
  }

  const handleCancel = () => {
    setLocalOverrides({})
    setIsEditing(false)
    setFeedbackMessage(null)
  }

  const handleSave = async (e?: FormEvent) => {
    if (e) e.preventDefault()
    setIsSaving(true)
    setFeedbackMessage(null)

    const payload = {
      nombre: formData.nombre.trim(),
      apellido: formData.apellido.trim(),
      correo: formData.correo.trim(),
      telefono: formData.telefono.trim(),
    }

    try {
      updateUser(payload)
      try {
        await updateProfileService(payload)
      } catch {
        // Local persistence succeeded even if server is offline
      }

      setLocalOverrides({})
      setFeedbackMessage('¡Perfil actualizado correctamente!')
      setIsEditing(false)
    } catch {
      setFeedbackMessage('No se pudo actualizar el perfil.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleShare = async () => {
    const textToShare = `${formData.nombre} ${formData.apellido} | ${formData.correo} | Tel: ${formData.telefono || 'N/A'}`
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToShare)
      }
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2500)
    } catch {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2500)
    }
  }

  const displayName = [formData.nombre, formData.apellido].filter(Boolean).join(' ').toUpperCase()

  return {
    user,
    displayName,
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    formData,
    isSaving,
    feedbackMessage,
    isCopied,
    handleChange,
    handleEditToggle,
    handleCancel,
    handleSave,
    handleShare,
  }
}
