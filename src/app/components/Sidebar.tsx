import { useNavigate, useLocation } from 'react-router';
import { ClipboardList, FilePlus, Search, Package, ArrowLeft, Sparkles } from 'lucide-react';

interface SidebarProps {
  mostrarBotonVolver?: boolean;
  rutaVolver?: string;
}

export default function Sidebar({ mostrarBotonVolver = false, rutaVolver = '/panel' }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: ClipboardList,
      label: 'Solicitudes asignadas',
      ruta: '/solicitudes-asignadas',
      color: 'blue'
    },
    {
      icon: FilePlus,
      label: 'Registrar incidente',
      ruta: '/registrar-incidente',
      color: 'green'
    },
    {
      icon: Search,
      label: 'Consultar incidentes',
      ruta: '/consultar-incidentes',
      color: 'purple'
    },
    {
      icon: Package,
      label: 'Gestión de inventarios',
      ruta: '/gestion-inventario',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive
        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-100 border-cyan-400 shadow-lg shadow-cyan-500/20'
        : 'text-white/80 hover:bg-white/10 hover:text-white',
      green: isActive
        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-100 border-green-400 shadow-lg shadow-green-500/20'
        : 'text-white/80 hover:bg-white/10 hover:text-white',
      purple: isActive
        ? 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-100 border-purple-400 shadow-lg shadow-purple-500/20'
        : 'text-white/80 hover:bg-white/10 hover:text-white',
      orange: isActive
        ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-100 border-orange-400 shadow-lg shadow-orange-500/20'
        : 'text-white/80 hover:bg-white/10 hover:text-white'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string, isActive: boolean) => {
    if (!isActive) return 'text-cyan-300';

    const colors = {
      blue: 'text-cyan-300',
      green: 'text-green-300',
      purple: 'text-purple-300',
      orange: 'text-orange-300'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 backdrop-blur-xl bg-gradient-to-b from-blue-950/95 via-blue-900/95 to-cyan-950/95 border-r border-white/10 shadow-2xl z-30 flex-col">
      {/* Efecto de brillo superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {/* Botón destacado Asistente IA */}
        <button
          onClick={() => navigate('/registrar-incidente-ia')}
          className="relative w-full overflow-hidden bg-gradient-to-r from-purple-600/30 to-violet-600/30 border-2 border-purple-400/50 px-4 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] group mb-4"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-3">
            <div className="bg-purple-500/30 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-semibold text-sm flex items-center gap-2">
                Asistente IA
                <span className="px-2 py-0.5 bg-purple-500/40 rounded-full text-[10px] font-bold">NUEVO</span>
              </div>
              <div className="text-purple-200/70 text-xs mt-0.5">Soporte inteligente 24/7</div>
            </div>
          </div>
        </button>

        <div className="border-b border-white/10 mb-4"></div>

        {menuItems.map((item) => {
          const isActive = location.pathname === item.ruta;
          const Icon = item.icon;

          return (
            <button
              key={item.ruta}
              onClick={() => navigate(item.ruta)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all backdrop-blur-sm ${
                getColorClasses(item.color, isActive)
              } ${isActive ? 'border-l-4 font-semibold' : 'border-l-4 border-transparent'}`}
            >
              <Icon className={`w-5 h-5 ${getIconColor(item.color, isActive)}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Botón Volver en la parte inferior - solo si mostrarBotonVolver es true */}
      {mostrarBotonVolver && (
        <div className="p-4 border-t border-white/10 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
          <button
            onClick={() => navigate(rutaVolver)}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 backdrop-blur-sm bg-white/10 border-2 border-cyan-400/50 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-lg hover:shadow-cyan-500/50 text-white font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Volver</span>
          </button>
        </div>
      )}

      {/* Efecto de brillo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
    </aside>
  );
}
