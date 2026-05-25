import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Eye, Calendar, Monitor, CheckCircle, Clock, UserPlus, MoreVertical } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getTickets } from '../utils/ticketsStorage';

export default function SolicitudesAsignadas() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [solicitudes, setSolicitudes] = useState([
    { ticket: '#1045', equipo: 'PC Oficina 1', descripcion: 'No enciende el equipo', estado: 'Nuevo', fechaAsignacion: '16/03/2026', prioridad: 'Alta' },
    { ticket: '#1046', equipo: 'Laptop 3', descripcion: 'Pantalla parpadeante', estado: 'En proceso', fechaAsignacion: '15/03/2026', prioridad: 'Media' },
    { ticket: '#1048', equipo: 'Monitor 5', descripcion: 'Sin señal de video', estado: 'Nuevo', fechaAsignacion: '16/03/2026', prioridad: 'Baja' },
  ]);

  // Cargar tickets dinámicos
  useEffect(() => {
    const ticketsGuardados = getTickets();
    if (ticketsGuardados.length > 0) {
      const solicitudesBase = [
        { ticket: '#1045', equipo: 'PC Oficina 1', descripcion: 'No enciende el equipo', estado: 'Nuevo', fechaAsignacion: '16/03/2026', prioridad: 'Alta' },
        { ticket: '#1046', equipo: 'Laptop 3', descripcion: 'Pantalla parpadeante', estado: 'En proceso', fechaAsignacion: '15/03/2026', prioridad: 'Media' },
        { ticket: '#1048', equipo: 'Monitor 5', descripcion: 'Sin señal de video', estado: 'Nuevo', fechaAsignacion: '16/03/2026', prioridad: 'Baja' },
      ];

      const ticketsMapeados = ticketsGuardados
        .filter(t => t.estado === 'Nuevo' || t.estado === 'En proceso')
        .map(t => ({
          ticket: t.ticket,
          equipo: t.equipo,
          descripcion: t.descripcion,
          estado: t.estado,
          fechaAsignacion: t.fechaAsignacion || t.fecha,
          prioridad: t.prioridad
        }));

      setSolicitudes([...ticketsMapeados, ...solicitudesBase]);
    }
  }, []);

  const getEstadoColor = (estado: string) => {
    if (estado === 'Nuevo') return 'bg-yellow-100 text-yellow-800';
    if (estado === 'En proceso') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getPrioridadColor = (prioridad: string) => {
    if (prioridad === 'Alta') return 'bg-red-100 text-red-800 border-red-200';
    if (prioridad === 'Media') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const handleCambiarEstado = (ticket: string, nuevoEstado: string) => {
    alert(`Ticket ${ticket} cambiado a estado: ${nuevoEstado}`);
    setMenuAbierto(null);
  };

  const handleIniciarTrabajo = (ticket: string) => {
    const confirmacion = confirm(`¿Desea iniciar el trabajo en el ticket ${ticket}?`);
    if (confirmacion) {
      alert(`Trabajo iniciado en ticket ${ticket}. Estado cambiado a "En proceso".`);
      setMenuAbierto(null);
    }
  };

  const handleMarcarCompletado = (ticket: string) => {
    const confirmacion = confirm(`¿Está seguro que desea marcar el ticket ${ticket} como completado?`);
    if (confirmacion) {
      alert(`Ticket ${ticket} marcado como completado.`);
      setMenuAbierto(null);
    }
  };

  const handleReasignar = (ticket: string) => {
    const tecnico = prompt('Ingrese el nombre del técnico al que desea reasignar:');
    if (tecnico) {
      alert(`Ticket ${ticket} reasignado a: ${tecnico}`);
      setMenuAbierto(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header titulo="Ver solicitudes asignadas" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/panel" />

      <div className="md:ml-64 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Monitor className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Incidentes asignados
          </h2>
          <span className="ml-auto bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {solicitudes.length} tickets
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Ticket</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Equipo</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Descripción del problema</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Prioridad</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Fecha asignación</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Estado</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((sol) => (
                  <tr key={sol.ticket} className="border-b border-gray-100 hover:bg-blue-50/30 transition">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{sol.ticket}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{sol.equipo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sol.descripcion}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPrioridadColor(sol.prioridad)}`}>
                        {sol.prioridad}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {sol.fechaAsignacion}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(sol.estado)}`}>
                        {sol.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => navigate(`/detalle-incidente/${sol.ticket.replaceAll('#', '')}`)}
                          className="group relative flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                        >
                          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="flex flex-col items-start gap-0.5">
                            <span className="text-xs font-semibold">Ver detalle</span>
                            <span className="flex items-center gap-1.5 text-[10px] opacity-90">
                              <span className={`px-1.5 py-0.5 rounded ${sol.estado === 'Nuevo' ? 'bg-yellow-400/30' : sol.estado === 'En proceso' ? 'bg-blue-400/30' : 'bg-green-400/30'}`}>
                                {sol.estado}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${sol.prioridad === 'Alta' ? 'bg-red-400' : sol.prioridad === 'Media' ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                                {sol.prioridad}
                              </span>
                            </span>
                          </span>
                        </button>
                        
                        {/* Menú de acciones adicionales */}
                        <div className="relative">
                          <button
                            onClick={() => setMenuAbierto(menuAbierto === sol.ticket ? null : sol.ticket)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>

                          {menuAbierto === sol.ticket && (
                            <>
                              {/* Backdrop para cerrar el menú */}
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setMenuAbierto(null)}
                              />
                              
                              {/* Menú desplegable */}
                              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden">
                                <div className="py-1">
                                  {sol.estado === 'Nuevo' && (
                                    <button
                                      onClick={() => handleIniciarTrabajo(sol.ticket)}
                                      className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center gap-3 text-sm text-gray-700 transition"
                                    >
                                      <Clock className="w-4 h-4 text-blue-600" />
                                      <span>Iniciar trabajo</span>
                                    </button>
                                  )}
                                  
                                  {sol.estado === 'En proceso' && (
                                    <button
                                      onClick={() => handleMarcarCompletado(sol.ticket)}
                                      className="w-full text-left px-4 py-3 hover:bg-green-50 flex items-center gap-3 text-sm text-gray-700 transition"
                                    >
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                      <span>Marcar como completado</span>
                                    </button>
                                  )}

                                  <button
                                    onClick={() => handleReasignar(sol.ticket)}
                                    className="w-full text-left px-4 py-3 hover:bg-purple-50 flex items-center gap-3 text-sm text-gray-700 transition"
                                  >
                                    <UserPlus className="w-4 h-4 text-purple-600" />
                                    <span>Reasignar técnico</span>
                                  </button>

                                  <div className="border-t border-gray-200 my-1"></div>

                                  <div className="px-4 py-2">
                                    <p className="text-xs font-semibold text-gray-500 mb-2">Cambiar estado:</p>
                                    <button
                                      onClick={() => handleCambiarEstado(sol.ticket, 'Nuevo')}
                                      className="w-full text-left px-3 py-2 hover:bg-yellow-50 rounded text-xs text-gray-700 transition"
                                    >
                                      Nuevo
                                    </button>
                                    <button
                                      onClick={() => handleCambiarEstado(sol.ticket, 'En proceso')}
                                      className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-xs text-gray-700 transition"
                                    >
                                      En proceso
                                    </button>
                                    <button
                                      onClick={() => handleCambiarEstado(sol.ticket, 'Resuelto')}
                                      className="w-full text-left px-3 py-2 hover:bg-green-50 rounded text-xs text-gray-700 transition"
                                    >
                                      Resuelto
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}