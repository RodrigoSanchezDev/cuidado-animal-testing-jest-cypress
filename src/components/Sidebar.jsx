import { NavLink } from 'react-router-dom'
import { 
  HiOutlineHome, 
  HiOutlineUsers, 
  HiOutlineHeart,
  HiOutlineCalendarDays,
  HiOutlineXMark,
  HiOutlineUserCircle
} from 'react-icons/hi2'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HiOutlineHome },
  { name: 'Clientes', href: '/clientes', icon: HiOutlineUsers },
  { name: 'Mascotas', href: '/mascotas', icon: HiOutlineHeart },
  { name: 'Veterinarios', href: '/veterinarios', icon: HiOutlineUserCircle },
  { name: 'Citas', href: '/citas', icon: HiOutlineCalendarDays },
]

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar - Oscuro 2D (sin sombras) */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-screen w-65 bg-slate-900
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          lg:translate-x-0 lg:sticky lg:z-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center">
              <HiOutlineHeart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">Cuidado Animal</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <HiOutlineXMark className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Navigation - flex-1 para ocupar espacio disponible */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-sky-500/15 border border-sky-400/30 text-white' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer - mt-auto para empujar al fondo */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <div className="px-4 py-3 bg-slate-800/50 rounded-xl">
            <p className="text-xs text-slate-400 font-medium">Versión 1.0.0</p>
            <p className="text-xs text-slate-500">Cuidado Animal © 2025</p>
          </div>
        </div>
      </aside>
    </>
  )
}
