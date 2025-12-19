import { Link } from 'react-router-dom'

/**
 * StatCard - KPI Card con soporte para variant="primary"
 * Primary: destacado con fondo sky + barra superior + elevación featured
 * Default: blanco neutro
 */
export function StatCard({ icon, value, label, linkTo, linkLabel = 'Ver detalles', variant = 'default' }) {
  const Icon = icon
  const isPrimary = variant === 'primary'
  
  return (
    <div className={`
      relative bg-white rounded-2xl border p-6 transition-all duration-200
      shadow-[0_14px_40px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.14)] hover:-translate-y-px
      ${isPrimary 
        ? 'border-slate-200/50 ring-1 ring-sky-200/70' 
        : 'border-slate-200/70'
      }
    `}>
      {/* Barra superior para primary */}
      {isPrimary && (
        <div className="absolute top-0 left-4 right-4 h-1 bg-sky-500/70 rounded-b-full" />
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isPrimary ? 'bg-sky-100' : 'bg-blue-50'}`}>
              {Icon && <Icon className={`w-5 h-5 ${isPrimary ? 'text-sky-600' : 'text-blue-600'}`} />}
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
        </div>
      </div>
      {linkTo && (
        <Link 
          to={linkTo}
          className={`inline-flex items-center gap-1 mt-4 text-sm font-medium ${
            isPrimary ? 'text-sky-600 hover:text-sky-700' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          {linkLabel}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}
