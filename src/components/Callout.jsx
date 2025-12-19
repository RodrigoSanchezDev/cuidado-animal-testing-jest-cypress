/**
 * Callout - Micro callout component for subtle highlights
 * Design: Sky-blue only, light + minimal
 */
export function Callout({ children, className = '' }) {
  return (
    <div className={`px-3 py-2 bg-sky-50/60 border border-sky-100 rounded-xl text-sm text-slate-600 ${className}`}>
      {children}
    </div>
  )
}
