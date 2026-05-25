import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, Eye, Calendar, MoreVertical, UserCheck, Edit, Trash2, FileDown, Printer } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getTickets } from '../utils/ticketsStorage';

export default function ConsultarIncidentes() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [incidentes, setIncidentes] = useState([
    { ticket: '#1045', equipo: 'PC Oficina 1', estado: 'Nuevo', fecha: '16/03/2026', usuario: 'Karen Audrey Hoya Salinas', prioridad: 'Alta' },
    { ticket: '#1046', equipo: 'Laptop 3', estado: 'En proceso', fecha: '16/03/2026', usuario: 'Luis Fernando Gonzalez Guevara', prioridad: 'Media' },
    { ticket: '#1044', equipo: 'Impresora 2', estado: 'Nuevo', fecha: '15/03/2026', usuario: 'Camilo Sarmiento Quintero', prioridad: 'Baja' },
    { ticket: '#1043', equipo: 'Monitor 5', estado: 'Cerrado', fecha: '15/03/2026', usuario: 'Maicol Stiben Bonilla', prioridad: 'Media' },
    { ticket: '#1042', equipo: 'Servidor 1', estado: 'En proceso', fecha: '14/03/2026', usuario: 'Esteban Alonso Umaña Velasquez', prioridad: 'Alta' },
  ]);

  // Cargar tickets dinámicos de localStorage
  useEffect(() => {
    const ticketsGuardados = getTickets();
    if (ticketsGuardados.length > 0) {
      // Combinar tickets estáticos con dinámicos
      const incidentesBase = [
        { ticket: '#1045', equipo: 'PC Oficina 1', estado: 'Nuevo', fecha: '16/03/2026', usuario: 'Karen Audrey Hoya Salinas', prioridad: 'Alta' },
        { ticket: '#1046', equipo: 'Laptop 3', estado: 'En proceso', fecha: '16/03/2026', usuario: 'Luis Fernando Gonzalez Guevara', prioridad: 'Media' },
        { ticket: '#1044', equipo: 'Impresora 2', estado: 'Nuevo', fecha: '15/03/2026', usuario: 'Camilo Sarmiento Quintero', prioridad: 'Baja' },
        { ticket: '#1043', equipo: 'Monitor 5', estado: 'Cerrado', fecha: '15/03/2026', usuario: 'Maicol Stiben Bonilla', prioridad: 'Media' },
        { ticket: '#1042', equipo: 'Servidor 1', estado: 'En proceso', fecha: '14/03/2026', usuario: 'Esteban Alonso Umaña Velasquez', prioridad: 'Alta' },
      ];

      const ticketsMapeados = ticketsGuardados.map(t => ({
        ticket: t.ticket,
        equipo: t.equipo,
        estado: t.estado,
        fecha: t.fecha,
        usuario: t.usuario,
        prioridad: t.prioridad
      }));

      setIncidentes([...ticketsMapeados, ...incidentesBase]);
    }
  }, []);

  const incidentesFiltrados = incidentes.filter((inc) => {
    const cumpleFiltro = filtroEstado === 'Todos' || inc.estado === filtroEstado;
    const cumpleBusqueda = 
      inc.ticket.toLowerCase().includes(busqueda.toLowerCase()) ||
      inc.equipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      inc.usuario.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  const getEstadoColor = (estado: string) => {
    if (estado === 'Nuevo') return 'bg-yellow-100 text-yellow-800';
    if (estado === 'En proceso') return 'bg-blue-100 text-blue-800';
    if (estado === 'Cerrado') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getPrioridadColor = (prioridad: string) => {
    if (prioridad === 'Alta') return 'bg-red-100 text-red-800 border-red-200';
    if (prioridad === 'Media') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const handleAsignarTecnico = (ticket: string) => {
    const tecnico = prompt('Ingrese el nombre del técnico a asignar:');
    if (tecnico) {
      alert(`Ticket ${ticket} asignado a: ${tecnico}`);
      setMenuAbierto(null);
    }
  };

  const handleEditarPrioridad = (ticket: string) => {
    const prioridades = ['Alta', 'Media', 'Baja'];
    const prioridad = prompt(`Ingrese la nueva prioridad (${prioridades.join(', ')}):`);
    if (prioridad && prioridades.includes(prioridad)) {
      alert(`Prioridad del ticket ${ticket} cambiada a: ${prioridad}`);
      setMenuAbierto(null);
    } else if (prioridad) {
      alert('Prioridad no válida');
    }
  };

  const handleEliminarTicket = (ticket: string) => {
    const confirmacion = confirm(`¿Está seguro que desea eliminar el ticket ${ticket}? Esta acción no se puede deshacer.`);
    if (confirmacion) {
      alert(`Ticket ${ticket} eliminado.`);
      setMenuAbierto(null);
    }
  };

  const handleExportarPDF = (ticket: string) => {
    alert(`Generando PDF del ticket ${ticket}...`);
    setMenuAbierto(null);
  };

  const handleImprimir = (ticket: string) => {
    alert(`Imprimiendo ticket ${ticket}...`);
    setMenuAbierto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header titulo="Consultar incidentes" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/panel" />

      <div className="md:ml-64 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Buscar ticket, equipo o usuario
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="Buscar..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Estado del incidente
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              >
                <option value="Todos">Todos</option>
                <option value="Nuevo">Nuevo</option>
                <option value="En proceso">En proceso</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
          </div>
          
          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando {incidentesFiltrados.length} de {incidentes.length} incidentes
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Lista de incidentes
        </h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Ticket</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Equipo</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Usuario</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Prioridad</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Estado</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Fecha</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {incidentesFiltrados.length > 0 ? (
                  incidentesFiltrados.map((inc) => (
                    <tr key={inc.ticket} className="border-b border-gray-100 hover:bg-purple-50/30 transition">
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">{inc.ticket}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{inc.equipo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{inc.usuario}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPrioridadColor(inc.prioridad)}`}>
                          {inc.prioridad}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(inc.estado)}`}>
                          {inc.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {inc.fecha}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => navigate(`/detalle-incidente/${inc.ticket.replaceAll('#', '')}`)}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            Ver detalle
                          </button>
                          
                          {/* Menú de acciones adicionales */}
                          <div className="relative">
                            <button
                              onClick={() => setMenuAbierto(menuAbierto === inc.ticket ? null : inc.ticket)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>

                            {menuAbierto === inc.ticket && (
                              <>
                                {/* Backdrop para cerrar el menú */}
                                <div 
                                  className="fixed inset-0 z-10" 
                                  onClick={() => setMenuAbierto(null)}
                                />
                                
                                {/* Menú desplegable */}
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden">
                                  <div className="py-1">
                                    <button
                                      onClick={() => handleAsignarTecnico(inc.ticket)}
                                      className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center gap-3 text-sm text-gray-700 transition"
                                    >
                                      <UserCheck className="w-4 h-4 text-blue-600" />
                                      <span>Asignar técnico</span>
                                    </button>

                                    <button
                                      onClick={() => handleEditarPrioridad(inc.ticket)}
                                      className="w-full text-left px-4 py-3 hover:bg-orange-50 flex items-center gap-3 text-sm text-gray-700 transition"
                                    >
                                      <Edit className="w-4 h-4 text-orange-600" />
                                      <span>Editar prioridad</span>
                                    </button>

                                    <div className="border-t border-gray-200 my-1"></div>

                                    <button
                                      onClick={() => handleExportarPDF(inc.ticket)}
                                      className="w-full text-left px-4 py-3 hover:bg-green-50 flex items-center gap-3 text-sm text-gray-700 transition"
                                    >
                                      <FileDown className="w-4 h-4 text-green-600" />
                                      <span>Exportar a PDF</span>
                                    </button>

                                    <button
                                      onClick={() => handleImprimir(inc.ticket)}
                                      className="w-full text-left px-4 py-3 hover:bg-purple-50 flex items-center gap-3 text-sm text-gray-700 transition"
                                    >
                                      <Printer className="w-4 h-4 text-purple-600" />
                                      <span>Imprimir</span>
                                    </button>

                                    <div className="border-t border-gray-200 my-1"></div>

                                    <button
                                      onClick={() => handleEliminarTicket(inc.ticket)}
                                      className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 text-sm text-red-600 transition"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      <span>Eliminar ticket</span>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No se encontraron incidentes con los filtros seleccionados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}