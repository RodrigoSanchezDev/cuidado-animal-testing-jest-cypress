/**
 * Card component - Sistema 3D Premium
 * - default: sombra ambient visible que "flota" sobre bg-slate-50
 * - featured: elevación mayor con ring sky para elementos destacados
 */
export function Card({ children, className = '', padding = 'p-6', variant = 'default' }) {
  const baseClasses = 'bg-white rounded-2xl transition-all duration-200'
  
  // Sistema de sombras 3D premium
  const variantClasses = {
    default: `
      border border-slate-200/70
      shadow-[0_14px_40px_rgba(15,23,42,0.10)]
      hover:shadow-[0_18px_55px_rgba(15,23,42,0.14)]
      hover:-translate-y-[1px]
    `,
    featured: `
      border border-slate-200/50
      ring-1 ring-sky-200/70
      shadow-[0_14px_40px_rgba(15,23,42,0.10)]
      hover:shadow-[0_18px_55px_rgba(15,23,42,0.14)]
      hover:-translate-y-[1px]
    `
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${padding} ${className}`}>
      {children}
    </div>
  )
}
