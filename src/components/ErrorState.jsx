import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

export function ErrorState({ message = 'Ha ocurrido un error', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="p-4 bg-red-50 rounded-full mb-4">
        <HiOutlineExclamationTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">Error</h3>
      <p className="text-slate-500 text-sm text-center max-w-sm mb-4">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
