import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Plus, Search, FileText } from 'lucide-react';
import { getTickets } from '../utils/ticketsStorage';

export default function PanelUsuario() {
  const navigate = useNavigate();
  const [ticketsRecientes, setTicketsRecientes] = useState([
    { id: 1, ticket: '#1050', asunto: 'Problema con impresora', estado: 'En proceso', fecha: '2026-04-12' },
    { id: 2, ticket: '#1048', asunto: 'Solicitud de acceso a sistema', estado: 'Nuevo', fecha: '2026-04-11' },
    { id: 3, ticket: '#1042', asunto: 'Error en aplicación', estado: 'Resuelto', fecha: '2026-04-08' },
  ]);

  useEffect(() => {
    const ticketsGuardados = getTickets();
    if (ticketsGuardados.length > 0) {
      const ticketsMapeados = ticketsGuardados.slice(0, 3).map((t, index) => ({
        id: index + 100,
        ticket: t.ticket,
        asunto: t.descripcion.substring(0, 40) + (t.descripcion.length > 40 ? '...' : ''),
        estado: t.estado,
        fecha: t.fecha
      }));

      const ticketsBase = [
        { id: 1, ticket: '#1050', asunto: 'Problema con impresora', estado: 'En proceso', fecha: '2026-04-12' },
        { id: 2, ticket: '#1048', asunto: 'Solicitud de acceso a sistema', estado: 'Nuevo', fecha: '2026-04-11' },
        { id: 3, ticket: '#1042', asunto: 'Error en aplicación', estado: 'Resuelto', fecha: '2026-04-08' },
      ];

      setTicketsRecientes([...ticketsMapeados, ...ticketsBase].slice(0, 3));
    }
  }, []);

  const getEstadoClasses = (estado: string) => {
    switch(estado) {
      case 'Nuevo':
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-200 border border-yellow-500/30 shadow-lg shadow-yellow-500/20';
      case 'En proceso':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-500/30 shadow-lg shadow-blue-500/20';
      case 'Resuelto':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 border border-green-500/30 shadow-lg shadow-green-500/20';
      default:
        return 'bg-white/10 text-white border border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Portal de Usuario" />
      <Sidebar />

      {/* Main Panel */}
      <div className="md:ml-64 p-4 md:p-8">
        {/* Acciones Principales */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Acciones rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Generar Ticket */}
            <button
              onClick={() => navigate('/usuario/generar-ticket')}
              className="group backdrop-blur-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-3xl shadow-2xl p-8 hover:scale-105 transition-all duration-300 text-left hover:shadow-cyan-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 bg-cyan-500/20 rounded-2xl group-hover:bg-cyan-500/30 transition">
                  <Plus className="w-8 h-8 text-cyan-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Generar Ticket de Soporte</h3>
                  <p className="text-sm text-cyan-100/70">Crea una nueva solicitud de ayuda o reporta un problema</p>
                </div>
              </div>
            </button>

            {/* Consultar Tickets */}
            <button
              onClick={() => navigate('/usuario/consultar-tickets')}
              className="group backdrop-blur-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-3xl shadow-2xl p-8 hover:scale-105 transition-all duration-300 text-left hover:shadow-purple-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 bg-purple-500/20 rounded-2xl group-hover:bg-purple-500/30 transition">
                  <Search className="w-8 h-8 text-purple-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Consultar Mis Tickets</h3>
                  <p className="text-sm text-purple-100/70">Revisa el estado de tus solicitudes anteriores</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Tickets Recientes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            Mis tickets recientes
          </h2>
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Ticket</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Asunto</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Estado</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {ticketsRecientes.map((ticket) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
