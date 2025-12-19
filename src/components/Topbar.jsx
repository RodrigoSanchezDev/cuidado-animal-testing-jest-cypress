import { 
  HiOutlineBars3, 
  HiOutlineMagnifyingGlass, 
  HiOutlineBell,
  HiOutlineCog6Tooth 
} from 'react-icons/hi2'

export function Topbar({ onMenuClick }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <HiOutlineBars3 className="w-5 h-5 text-slate-600" />
        </button>
        
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2.5 w-64 lg:w-80">
          <HiOutlineMagnifyingGlass className="w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors relative">
          <HiOutlineBell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
          <HiOutlineCog6Tooth className="w-5 h-5 text-slate-500" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 mx-2"></div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-700">Dr. García</p>
            <p className="text-xs text-slate-500">Administrador</p>
          </div>
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-sm font-bold text-white">DG</span>
          </div>
        </div>
      </div>
    </header>
  )
}
