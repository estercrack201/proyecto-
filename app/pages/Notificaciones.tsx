import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell, CheckCircle, AlertCircle, Clock, Trash2, Check, Filter } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Notificaciones() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState<'todas' | 'no_leidas'>('todas');

  const [notificaciones, setNotificaciones] = useState([
    { id: 1, tipo: 'nuevo', titulo: 'Nuevo ticket asignado', descripcion: '#1050 - PC Oficina 3', tiempo: 'Hace 5 min', leido: false, ticket: '1050', fecha: '25/04/2026 10:30 AM' },
    { id: 2, tipo: 'actualizado', titulo: 'Ticket actualizado', descripcion: '#1046 cambió a Resuelto', tiempo: 'Hace 15 min', leido: false, ticket: '1046', fecha: '25/04/2026 10:20 AM' },
    { id: 3, tipo: 'completado', titulo: 'Ticket completado', descripcion: '#1044 ha sido cerrado', tiempo: 'Hace 1 hora', leido: true, ticket: '1044', fecha: '25/04/2026 09:35 AM' },
    { id: 4, tipo: 'nuevo', titulo: 'Nuevo ticket asignado', descripcion: '#1051 - Laptop con pantalla rota', tiempo: 'Hace 2 horas', leido: true, ticket: '1051', fecha: '25/04/2026 08:35 AM' },
    { id: 5, tipo: 'actualizado', titulo: 'Comentario en ticket', descripcion: '#1045 - Nuevo comentario del usuario', tiempo: 'Hace 3 horas', leido: true, ticket: '1045', fecha: '25/04/2026 07:35 AM' },
    { id: 6, tipo: 'nuevo', titulo: 'Ticket de alta prioridad', descripcion: '#1052 - Servidor caído urgente', tiempo: 'Ayer', leido: true, ticket: '1052', fecha: '24/04/2026 04:20 PM' },
  ]);

  const getNotifIcon = (tipo: string) => {
    switch(tipo) {
      case 'nuevo': return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case 'actualizado': return <Clock className="w-6 h-6 text-blue-500" />;
      case 'completado': return <CheckCircle className="w-6 h-6 text-green-500" />;
      default: return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  const getNotifBgColor = (tipo: string) => {
    switch(tipo) {
      case 'nuevo': return 'bg-yellow-50 border-yellow-200';
      case 'actualizado': return 'bg-blue-50 border-blue-200';
      case 'completado': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleMarcarLeida = (id: number) => {
    setNotificaciones(notificaciones.map(n =>
      n.id === id ? { ...n, leido: true } : n
    ));
  };

  const handleEliminar = (id: number) => {
    setNotificaciones(notificaciones.filter(n => n.id !== id));
  };

  const handleMarcarTodasLeidas = () => {
    setNotificaciones(notificaciones.map(n => ({ ...n, leido: true })));
  };

  const handleVerTicket = (ticket: string, id: number) => {
    handleMarcarLeida(id);
    navigate(`/detalle-incidente/${ticket}`);
  };

  const notificacionesFiltradas = filtro === 'no_leidas'
    ? notificaciones.filter(n => !n.leido)
    : notificaciones;

  const noLeidas = notificaciones.filter(n => !n.leido).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header titulo="Notificaciones" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/panel" />

      <div className="md:ml-64 max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Notificaciones
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {noLeidas > 0 ? `Tienes ${noLeidas} notificación${noLeidas > 1 ? 'es' : ''} sin leer` : 'No tienes notificaciones sin leer'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleMarcarTodasLeidas}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
            >
              <Check className="w-4 h-4" />
              Marcar todas leídas
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFiltro('todas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium ${
              filtro === 'todas'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Todas ({notificaciones.length})
          </button>
          <button
            onClick={() => setFiltro('no_leidas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium ${
              filtro === 'no_leidas'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            Sin leer ({noLeidas})
          </button>
        </div>

        {/* Lista de notificaciones */}
        <div className="space-y-3">
          {notificacionesFiltradas.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No hay notificaciones</p>
              <p className="text-gray-400 text-sm mt-2">Cuando tengas nuevas notificaciones aparecerán aquí</p>
            </div>
          ) : (
            notificacionesFiltradas.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white rounded-xl border-2 overflow-hidden transition hover:shadow-lg ${
                  !notif.leido ? 'border-blue-300 shadow-md' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4 p-5">
                  <div className={`p-3 rounded-lg ${getNotifBgColor(notif.tipo)}`}>
                    {getNotifIcon(notif.tipo)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-gray-900">{notif.titulo}</h3>
                          {!notif.leido && (
                            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notif.descripcion}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notif.tiempo}
                          </span>
                          <span>•</span>
                          <span>{notif.fecha}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {!notif.leido && (
                          <button
                            onClick={() => handleMarcarLeida(notif.id)}
                            className="p-2 hover:bg-green-50 rounded-lg transition"
                            title="Marcar como leída"
                          >
                            <Check className="w-5 h-5 text-green-600" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEliminar(notif.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                          title="Eliminar notificación"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>

                    {notif.ticket && (
                      <button
                        onClick={() => handleVerTicket(notif.ticket, notif.id)}
                        className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        Ver ticket #{notif.ticket}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
