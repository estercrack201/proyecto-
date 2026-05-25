import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Search, Filter } from 'lucide-react';

export default function ConsultarTicketsUsuario() {
  const navigate = useNavigate();
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const todosLosTickets = [
    { id: 1, ticket: '#1050', asunto: 'Problema con impresora', estado: 'En proceso', fecha: '2026-04-12', tecnico: 'Esteban Alonso Umaña Velasquez' },
    { id: 2, ticket: '#1048', asunto: 'Solicitud de acceso a sistema', estado: 'Nuevo', fecha: '2026-04-11', tecnico: 'Sin asignar' },
    { id: 3, ticket: '#1042', asunto: 'Error en aplicación', estado: 'Resuelto', fecha: '2026-04-08', tecnico: 'Luis Fernando Gonzalez Guevara' },
    { id: 4, ticket: '#1038', asunto: 'Cambio de contraseña', estado: 'Resuelto', fecha: '2026-04-05', tecnico: 'Camilo Sarmiento Quintero' },
    { id: 5, ticket: '#1035', asunto: 'Instalación de software', estado: 'Cerrado', fecha: '2026-04-02', tecnico: 'Maicol Stiben Bonilla' },
    { id: 6, ticket: '#1030', asunto: 'Problema con mouse', estado: 'Resuelto', fecha: '2026-03-28', tecnico: 'Karen Audrey Hoya Salinas' },
  ];

  const ticketsFiltrados = todosLosTickets.filter((ticket) => {
    const cumpleFiltro = filtroEstado === 'Todos' || ticket.estado === filtroEstado;
    const cumpleBusqueda = ticket.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
                           ticket.ticket.includes(busqueda);
    return cumpleFiltro && cumpleBusqueda;
  });

  const getEstadoClasses = (estado: string) => {
    switch(estado) {
      case 'Nuevo':
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-200 border border-yellow-500/30 shadow-lg shadow-yellow-500/20';
      case 'En proceso':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-500/30 shadow-lg shadow-blue-500/20';
      case 'Resuelto':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 border border-green-500/30 shadow-lg shadow-green-500/20';
      case 'Cerrado':
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-200 border border-gray-500/30 shadow-lg shadow-gray-500/20';
      default:
        return 'bg-white/10 text-white border border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Consultar Tickets" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/usuario/panel" />

      <div className="md:ml-64 p-4 md:p-8">
        {/* Barra de búsqueda y filtros */}
        <div className="mb-6 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-300" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por número de ticket o asunto..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Filtro por estado */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-cyan-300" />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                <option value="Todos" className="bg-blue-950">Todos los estados</option>
                <option value="Nuevo" className="bg-blue-950">Nuevo</option>
                <option value="En proceso" className="bg-blue-950">En proceso</option>
                <option value="Resuelto" className="bg-blue-950">Resuelto</option>
                <option value="Cerrado" className="bg-blue-950">Cerrado</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-cyan-100/70">
            Mostrando {ticketsFiltrados.length} de {todosLosTickets.length} tickets
          </div>
        </div>

        {/* Tabla de tickets */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-b border-white/10">
                <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Ticket</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Asunto</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Estado</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Fecha</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Técnico</th>
              </tr>
            </thead>
            <tbody>
              {ticketsFiltrados.length > 0 ? (
                ticketsFiltrados.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer"
                    onClick={() => navigate(`/detalle-incidente/${ticket.ticket.replaceAll('#', '')}`)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-cyan-300">{ticket.ticket}</td>
                    <td className="px-6 py-4 text-sm text-white">{ticket.asunto}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getEstadoClasses(ticket.estado)}`}>
                        {ticket.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-cyan-100/70">{ticket.fecha}</td>
                    <td className="px-6 py-4 text-sm text-white/80">{ticket.tecnico}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    No se encontraron tickets con los filtros seleccionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
