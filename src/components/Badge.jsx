/**
 * Badge variants - Blue/Sky primario + Teal acento para "en progreso"
 * Sistema de colores veterinario premium
 */
const variants = {
  pending: 'bg-sky-50 text-sky-700 border-sky-200',
  'in-progress': 'bg-teal-50 text-teal-700 border-teal-200 font-semibold',
  completed: 'bg-slate-50 text-slate-600 border-slate-200',
  default: 'bg-slate-50 text-slate-600 border-slate-200',
  info: 'bg-sky-50 text-sky-700 border-sky-100',
  warning: 'bg-sky-100/80 text-sky-800 border-sky-200',
  success: 'bg-slate-100 text-slate-700 border-slate-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200'
}

export function Badge({ children, variant = 'default', className = '' }) {
  const variantClass = variants[variant] || variants.default
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${variantClass} ${className}`}>
      {children}
    </span>
  )
}
