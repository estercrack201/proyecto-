import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, User, Bell, ChevronDown, Settings, Globe, HelpCircle, HeadphonesIcon, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import logo from 'figma:asset/e26f162e3f7adca37023bc3d257bafaa22f28dae.png';

interface HeaderProps {
  titulo?: string;
}

export default function Header({ titulo = "Panel del Técnico" }: HeaderProps) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const notificaciones = [
    { id: 1, tipo: 'nuevo', titulo: 'Nuevo ticket asignado', descripcion: '#1050 - PC Oficina 3', tiempo: 'Hace 5 min', leido: false, ticket: '1050' },
    { id: 2, tipo: 'actualizado', titulo: 'Ticket actualizado', descripcion: '#1046 cambió a Resuelto', tiempo: 'Hace 15 min', leido: false, ticket: '1046' },
    { id: 3, tipo: 'completado', titulo: 'Ticket completado', descripcion: '#1044 ha sido cerrado', tiempo: 'Hace 1 hora', leido: true, ticket: '1044' },
  ];

  const handleNotificacionClick = (ticket: string) => {
    setNotificacionesAbiertas(false);
    navigate(`/detalle-incidente/${ticket}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificacionesAbiertas(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getNotifIcon = (tipo: string) => {
    switch(tipo) {
      case 'nuevo': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'actualizado': return <Clock className="w-5 h-5 text-blue-400" />;
      case 'completado': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <header className="backdrop-blur-xl bg-gradient-to-r from-blue-950/95 via-blue-900/95 to-cyan-900/95 border-b border-white/10 sticky top-0 z-40 shadow-lg">
      <div className="mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/panel')}
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full group-hover:bg-cyan-400/30 transition"></div>
              <img src={logo} alt="InvenDesk Smart Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10 drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg">InvenDesk Smart</h1>
              <p className="text-xs md:text-sm text-cyan-100/80 hidden sm:block">{titulo}</p>
            </div>
          </button>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Notificaciones */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotificacionesAbiertas(!notificacionesAbiertas)}
                className="relative p-2 md:p-2.5 text-white/80 hover:text-white transition backdrop-blur-sm bg-white/5 rounded-lg hover:bg-white/10 border border-white/10"
              >
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {notificacionesAbiertas && (
                <div className="absolute right-0 mt-2 w-72 md:w-80 backdrop-blur-2xl bg-blue-950/95 rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50">
                  <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
                    <h3 className="font-semibold text-white">Notificaciones</h3>
                    <p className="text-xs text-cyan-100/70">Tienes {notificaciones.filter(n => !n.leido).length} nuevas</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notificaciones.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificacionClick(notif.ticket)}
                        className={`p-4 border-b border-white/5 hover:bg-white/10 transition cursor-pointer ${!notif.leido ? 'bg-cyan-900/20' : ''}`}
                      >
                        <div className="flex gap-3">
                          <div className="mt-1">{getNotifIcon(notif.tipo)}</div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{notif.titulo}</p>
                            <p className="text-xs text-cyan-100/70 mt-1">{notif.descripcion}</p>
                            <p className="text-xs text-cyan-100/50 mt-1">{notif.tiempo}</p>
                          </div>
                          {!notif.leido && <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 text-center">
                    <button
                      onClick={() => {
                        setNotificacionesAbiertas(false);
                        navigate('/notificaciones');
                      }}
                      className="text-xs text-cyan-300 hover:text-cyan-100 font-medium transition"
                    >
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Menú de usuario */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-1 md:gap-2 backdrop-blur-sm bg-white/10 px-2 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-white/15 transition border border-white/20"
              >
                <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                <span className="text-xs md:text-sm font-medium text-white hidden sm:inline">Menú</span>
                <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-white transition-transform ${menuAbierto ? 'rotate-180' : ''}`} />
              </button>

              {menuAbierto && (
                <div className="absolute right-0 mt-2 w-72 md:w-80 backdrop-blur-2xl bg-blue-950/95 rounded-2xl shadow-2xl border border-white/20 py-2 z-50 overflow-hidden max-h-[80vh] overflow-y-auto">
                  {/* Perfiles */}
                  <div className="px-2 py-2">
                    {/* Perfil Activo - Técnico */}
                    <div className="px-3 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl mb-2 border border-cyan-500/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">T</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">Técnico</p>
                          <p className="text-xs text-cyan-100/70 truncate">tecnico@invendesk.com</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-cyan-500/30 border border-cyan-400/40 rounded-full text-xs text-cyan-200 font-medium">
                            Técnico - Activo
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Perfil Administrador */}
                    <div className="px-3 py-3 hover:bg-white/5 rounded-xl mb-2 transition cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">A</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">Administrador</p>
                          <p className="text-xs text-cyan-100/70 truncate">admin@invendesk.com</p>
                        </div>
                        <button className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-medium text-white transition">
                          Cambiar
                        </button>
                      </div>
                    </div>

                    {/* Perfil Usuario Final */}
                    <div className="px-3 py-3 hover:bg-white/5 rounded-xl transition cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">U</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">Usuario Final</p>
                          <p className="text-xs text-cyan-100/70 truncate">cliente@invendesk.com</p>
                        </div>
                        <button
                          onClick={() => {
                            setMenuAbierto(false);
                            navigate('/usuario/panel');
                          }}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-medium text-white transition"
                        >
                          Cambiar
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 my-1"></div>

                  {/* Configuraciones */}
                  <button
                    onClick={() => {
                      setMenuAbierto(false);
                      navigate('/configuraciones');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 transition flex items-center gap-3 text-white"
                  >
                    <Settings className="w-5 h-5 text-cyan-300" />
                    <span className="text-sm font-medium">Configuraciones</span>
                  </button>

                  {/* Idioma */}
                  <button
                    onClick={() => {
                      setMenuAbierto(false);
                      navigate('/idioma');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 transition flex items-center gap-3 text-white"
                  >
                    <Globe className="w-5 h-5 text-cyan-300" />
                    <span className="text-sm font-medium">Idioma</span>
                  </button>

                  <div className="border-t border-white/10 my-1"></div>

                  {/* Ayuda */}
                  <button
                    onClick={() => {
                      setMenuAbierto(false);
                      navigate('/ayuda');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 transition flex items-center gap-3 text-white"
                  >
                    <HelpCircle className="w-5 h-5 text-blue-300" />
                    <span className="text-sm font-medium">Ayuda</span>
                  </button>

                  {/* Soporte */}
                  <button
                    onClick={() => {
                      setMenuAbierto(false);
                      navigate('/soporte');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 transition flex items-center gap-3 text-white"
                  >
                    <HeadphonesIcon className="w-5 h-5 text-green-300" />
                    <span className="text-sm font-medium">Soporte</span>
                  </button>

                  <div className="border-t border-white/10 my-1"></div>

                  {/* Cerrar sesión */}
                  <button
                    onClick={() => {
                      setMenuAbierto(false);
                      navigate('/');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-red-500/20 transition flex items-center gap-3 text-red-300 hover:text-red-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
