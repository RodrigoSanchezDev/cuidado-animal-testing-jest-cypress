import { HiOutlineInbox } from 'react-icons/hi2'

export function EmptyState({ 
  icon: Icon = HiOutlineInbox, 
  title = 'No hay datos', 
  description = 'No se encontraron resultados.' 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="p-4 bg-slate-100 rounded-full mb-4">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-slate-500 text-sm text-center max-w-sm">{description}</p>
    </div>
  )
}
