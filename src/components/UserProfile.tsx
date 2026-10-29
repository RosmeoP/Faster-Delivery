import type { FC } from 'react'
import {
  Bell,
  Check,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react'
import { useUserProfileViewModel } from '../viewmodels/useUserProfileViewModel'

export const UserProfile: FC = () => {
  const {
    displayName,
    activeTab,
    setActiveTab,
    isEditing,
    formData,
    isSaving,
    feedbackMessage,
    isCopied,
    handleChange,
    handleEditToggle,
    handleCancel,
    handleSave,
    handleShare,
  } = useUserProfileViewModel()

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-8">
      {/* ══════════════════════════════════════════
          TARJETA 1 – CABECERA DE PERFIL
      ══════════════════════════════════════════ */}
      <section className="flex flex-col gap-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
          {/* Avatar Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ede9fe] text-[#5037ed]">
            <User size={32} strokeWidth={2.2} />
          </div>

          {/* Nombre & Contacto */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 uppercase sm:text-2xl leading-[1.15]">
              {formData.nombre ? (
                <>
                  <div>{formData.nombre}</div>
                  <div>{formData.apellido}</div>
                </>
              ) : (
                displayName || 'USUARIO'
              )}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Mail size={16} className="text-slate-400" />
                <span>{formData.correo || 'correo@ejemplo.com'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={16} className="text-slate-400" />
                <span>{formData.telefono || 'Sin teléfono registrado'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Botón Compartir */}
        <div className="shrink-0 self-start lg:self-center">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
          >
            {isCopied ? (
              <>
                <Check size={16} className="text-emerald-600" />
                <span className="text-emerald-700">¡Copiado!</span>
              </>
            ) : (
              <span>Compartir</span>
            )}
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TARJETA 2 – GESTIÓN DE CUENTA
      ══════════════════════════════════════════ */}
      <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
        <h2 className="text-[17px] font-bold text-slate-900">
          Gestion de Cuenta
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Configuracion y accesos rapidos
        </p>

        <nav className="mt-4 space-y-1">
          {/* Opción 1: Información personal (Activa) */}
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`relative flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
              activeTab === 'personal'
                ? 'bg-[#f4f2ff] text-[#5037ed] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:rounded-r before:bg-[#5037ed]'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User size={18} className={activeTab === 'personal' ? 'text-[#5037ed]' : 'text-slate-500'} />
            <span>Informacion personal</span>
          </button>

          {/* Opción 2: Direcciones de entrega */}
          <button
            type="button"
            onClick={() => setActiveTab('direcciones')}
            className={`relative flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
              activeTab === 'direcciones'
                ? 'bg-[#f4f2ff] font-semibold text-[#5037ed] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:rounded-r before:bg-[#5037ed]'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MapPin size={18} className={activeTab === 'direcciones' ? 'text-[#5037ed]' : 'text-slate-500'} />
            <span>Direcciones de entrega</span>
          </button>

          {/* Opción 3: Métodos de pago */}
          <button
            type="button"
            onClick={() => setActiveTab('pagos')}
            className={`relative flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
              activeTab === 'pagos'
                ? 'bg-[#f4f2ff] font-semibold text-[#5037ed] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:rounded-r before:bg-[#5037ed]'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <CreditCard size={18} className={activeTab === 'pagos' ? 'text-[#5037ed]' : 'text-slate-500'} />
            <span>Metodos de pago</span>
          </button>

          {/* Opción 4: Historial de pedidos */}
          <button
            type="button"
            onClick={() => setActiveTab('pedidos')}
            className={`relative flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
              activeTab === 'pedidos'
                ? 'bg-[#f4f2ff] font-semibold text-[#5037ed] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:rounded-r before:bg-[#5037ed]'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bell size={18} className={activeTab === 'pedidos' ? 'text-[#5037ed]' : 'text-slate-500'} />
            <span>Historial de pedidos</span>
          </button>
        </nav>
      </section>

      {/* ══════════════════════════════════════════
          TARJETA 3 – DATOS PERSONALES
      ══════════════════════════════════════════ */}
      {activeTab === 'personal' && (
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          {/* Header de la tarjeta */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Datos Personales
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Informacion obtenida de la sesion actual
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
              )}
              <button
                type="button"
                id="btn-edit-profile"
                onClick={handleEditToggle}
                disabled={isSaving}
                className="cursor-pointer rounded-xl bg-[#432bd8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3823bc] focus:ring-2 focus:ring-violet-400 focus:outline-none"
              >
                {isSaving ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Editar perfil'}
              </button>
            </div>
          </div>

          {feedbackMessage && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700"
            >
              {feedbackMessage}
            </div>
          )}

          <div className="mt-6 border-t border-slate-100 pt-6">
            <form onSubmit={handleSave} className="space-y-5">
              {/* Campo 1: Nombre */}
              <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
                <label
                  htmlFor="profile-nombre"
                  className="text-sm font-semibold text-slate-800 sm:col-span-3"
                >
                  Nombre
                </label>
                <div className="sm:col-span-9">
                  <input
                    id="profile-nombre"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    placeholder="Tu nombre"
                    className={`w-full rounded-xl border px-4 py-3 text-sm font-medium uppercase transition-all ${
                      isEditing
                        ? 'border-slate-300 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none'
                        : 'border-slate-200 bg-slate-50/70 text-slate-700 cursor-default'
                    }`}
                  />
                </div>
              </div>

              {/* Campo 2: Apellido */}
              <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
                <label
                  htmlFor="profile-apellido"
                  className="text-sm font-semibold text-slate-800 sm:col-span-3"
                >
                  Apellido
                </label>
                <div className="sm:col-span-9">
                  <input
                    id="profile-apellido"
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    placeholder="Tu apellido"
                    className={`w-full rounded-xl border px-4 py-3 text-sm font-medium uppercase transition-all ${
                      isEditing
                        ? 'border-blue-600 bg-white text-slate-900 ring-2 ring-blue-100 focus:outline-none'
                        : 'border-slate-200 bg-slate-50/70 text-slate-700 cursor-default'
                    }`}
                  />
                </div>
              </div>

              {/* Campo 3: Correo electrónico */}
              <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
                <label
                  htmlFor="profile-correo"
                  className="text-sm font-semibold text-slate-800 sm:col-span-3"
                >
                  Correo electronico
                </label>
                <div className="sm:col-span-9">
                  <input
                    id="profile-correo"
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    placeholder="correo@ejemplo.com"
                    className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      isEditing
                        ? 'border-slate-300 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none'
                        : 'border-slate-200 bg-slate-50/70 text-slate-700 cursor-default'
                    }`}
                  />
                </div>
              </div>

              {/* Campo 4: Número telefónico */}
              <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
                <label
                  htmlFor="profile-telefono"
                  className="text-sm font-semibold text-slate-800 sm:col-span-3"
                >
                  Numero telefonico
                </label>
                <div className="sm:col-span-9">
                  <input
                    id="profile-telefono"
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    placeholder="Ej. 25852541212"
                    className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      isEditing
                        ? 'border-slate-300 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none'
                        : 'border-slate-200 bg-slate-50/70 text-slate-700 cursor-default'
                    }`}
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Secciones adicionales para las otras pestañas */}
      {activeTab === 'direcciones' && (
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Direcciones de entrega
            </h2>
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className="text-xs font-semibold text-[#5037ed] hover:underline"
            >
              Volver a datos personales
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            No tienes direcciones guardadas actualmente. Las direcciones se asociarán automáticamente con tus pedidos futuros.
          </p>
        </section>
      )}

      {activeTab === 'pagos' && (
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Metodos de pago
            </h2>
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className="text-xs font-semibold text-[#5037ed] hover:underline"
            >
              Volver a datos personales
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Puedes pagar en efectivo al recibir o con tarjeta de débito/crédito durante el checkout de tu pedido.
          </p>
        </section>
      )}

      {activeTab === 'pedidos' && (
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Historial de pedidos
            </h2>
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className="text-xs font-semibold text-[#5037ed] hover:underline"
            >
              Volver a datos personales
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Aún no has realizado pedidos con esta cuenta. Explora nuestro catálogo para comenzar a ordenar.
          </p>
        </section>
      )}
    </div>
  )
}
export default UserProfile
