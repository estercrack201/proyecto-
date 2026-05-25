import { useNavigate } from 'react-router';
import { Sparkles, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function PanelTecnico() {
  const navigate = useNavigate();

  const solicitudes = [
    { ticket: '#1045', equipo: 'PC Oficina 1', estado: 'Nuevo' },
    { ticket: '#1046', equipo: 'Laptop 3', estado: 'En proceso' },
    { ticket: '#1044', equipo: 'Impresora 2', estado: 'Nuevo' },
  ];

  const getEstadoClasses = (estado: string) => {
    if (estado === 'Nuevo') {
      return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-200 border border-yellow-500/30 shadow-lg shadow-yellow-500/20';
    }
    if (estado === 'En proceso') {
      return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-500/30 shadow-lg shadow-blue-500/20';
    }
    return 'bg-white/10 text-white border border-white/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Panel del Técnico" />
      <Sidebar />

      {/* Main Panel */}
      <div className="md:ml-64 p-4 md:p-8">
        {/* Banner Asistente IA */}
        <div className="mb-6">
          <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-r from-purple-900/40 via-violet-900/40 to-purple-900/40 border-2 border-purple-400/30 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-violet-600/10"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"></div>

            <div className="relative flex items-center gap-6">
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-purple-600 to-violet-700 p-5 rounded-2xl shadow-xl">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-purple-500/30 border border-purple-400/50 rounded-full text-xs text-purple-200 font-semibold">
                    ✨ NUEVO
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Asistente IA SecurIT</h3>
                <p className="text-purple-100/80 text-sm md:text-base">
                  Nivel 1 de soporte inteligente • Resuelve el 70% de incidentes automáticamente • Disponible 24/7
                </p>
              </div>

              <button
                onClick={() => navigate('/registrar-incidente-ia')}
                className="group bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-4 rounded-xl font-semibold shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="hidden md:inline">Probar Ahora</span>
                <span className="md:hidden">Iniciar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Solicitudes Recientes */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
            Solicitudes recientes
          </h2>
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Ticket</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Equipo</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-cyan-100">Estado</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((sol, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer last:border-0"
                    onClick={() => navigate(`/detalle-incidente/${sol.ticket.replaceAll('#', '')}`)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-cyan-300">{sol.ticket}</td>
                    <td className="px-6 py-4 text-sm text-white">{sol.equipo}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getEstadoClasses(sol.estado)}`}>
                        {sol.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}