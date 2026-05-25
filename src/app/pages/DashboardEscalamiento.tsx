import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, User, Clock, Flag, FileText, Brain, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { saveTicket } from '../utils/ticketsStorage';

export default function DashboardEscalamiento() {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState<any>(null);
  const [ticketNumero, setTicketNumero] = useState('');
  const [procesando, setProcesando] = useState(true);

  useEffect(() => {
    // Cargar datos del escalamiento
    const data = sessionStorage.getItem('ticket_escalamiento');
    if (!data) {
      navigate('/registrar-incidente-ia');
      return;
    }

    const ticket = JSON.parse(data);
    setTicketData(ticket);

    // Simular procesamiento de escalamiento
    setTimeout(() => {
      // Guardar ticket escalado
      const nuevoTicket = saveTicket({
        equipo: 'Diagnóstico IA completado',
        descripcion: ticket.descripcion,
        usuario: ticket.usuario,
        email: ticket.email,
        departamento: 'Escalado desde IA',
        ubicacion: 'Nivel 2 - Soporte Técnico',
        prioridad: ticket.urgencia,
        categoria: ticket.categoria,
        tecnicoAsignado: 'Esteban Alonso Umaña Velasquez'
      });

      setTicketNumero(nuevoTicket.ticket);
      setProcesando(false);
    }, 2000);
  }, [navigate]);

  const getUrgenciaColor = (urgencia: string) => {
    switch(urgencia) {
      case 'Alta': return 'from-red-600 to-orange-600';
      case 'Media': return 'from-yellow-600 to-orange-500';
      case 'Baja': return 'from-blue-600 to-cyan-600';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  const getUrgenciaIcon = (urgencia: string) => {
    switch(urgencia) {
      case 'Alta': return '🔴';
      case 'Media': return '🟡';
      case 'Baja': return '🟢';
      default: return '⚪';
    }
  };

  const handleFinalizar = () => {
    sessionStorage.removeItem('ticket_escalamiento');
    sessionStorage.removeItem('ticket_ia_temp');
    navigate('/consultar-incidentes');
  };

  if (!ticketData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      <Header titulo="Dashboard de Escalamiento" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/panel" />

      <div className="md:ml-64 max-w-6xl mx-auto px-4 md:px-6 py-8">
        {procesando ? (
          /* Estado de procesamiento */
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-orange-600 to-red-700 p-6 rounded-full shadow-xl animate-bounce">
                <Zap className="w-16 h-16 text-white" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Transfiriendo a Soporte Técnico</h2>
            <p className="text-cyan-200/80 text-lg">Preparando resumen de diagnóstico para el técnico...</p>

            <div className="mt-8 max-w-md mx-auto bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Resumen de IA generado</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Diagnóstico adjuntado</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Asignando técnico especializado...</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard de escalamiento */
          <div className="space-y-6">
            {/* Banner de estado */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-orange-600/30 to-red-600/30 border-2 border-orange-400/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/30 p-4 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-orange-300 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">Ticket Escalado a Soporte Técnico Nivel 2</h2>
                  </div>
                  <p className="text-orange-100/90">Tu caso ha sido transferido a un especialista con todo el historial de diagnóstico.</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-orange-200/70 mb-1">Ticket #</div>
                  <div className="text-2xl font-bold text-white">{ticketNumero}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Panel izquierdo - Resumen IA */}
              <div className="lg:col-span-2 space-y-6">
                {/* Resumen generado por IA */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="bg-purple-500/30 p-2 rounded-lg">
                      <Brain className="w-6 h-6 text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">Resumen Generado por IA</h3>
                      <p className="text-white/60 text-sm">Análisis automático del problema</p>
                    </div>
                    <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-xs text-purple-200 font-medium">
                      IA SecurIT
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-sm text-cyan-300 font-medium mb-2">📊 Diagnóstico</div>
                      <p className="text-white/90">{ticketData.diagnosticoIA}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-sm text-cyan-300 font-medium mb-2">🔍 Análisis Detallado</div>
                      <p className="text-white/90">{ticketData.resumenIA}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-sm text-cyan-300 font-medium mb-3">✅ Soluciones Intentadas</div>
                      <div className="space-y-2">
                        {ticketData.pasosIntentados.map((paso: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-white/80 text-sm">
                            <span className="text-red-400 mt-0.5">✗</span>
                            <span>{paso}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción original del usuario */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <div className="bg-cyan-500/30 p-2 rounded-lg">
                      <FileText className="w-6 h-6 text-cyan-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Descripción Original del Usuario</h3>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/90 italic leading-relaxed">"{ticketData.descripcion}"</p>
                  </div>
                </div>
              </div>

              {/* Panel derecho - Información y Timeline */}
              <div className="space-y-6">
                {/* Información del ticket */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Información del Ticket</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-white/60 mb-1">Urgencia</div>
                      <div className={`inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${getUrgenciaColor(ticketData.urgencia)} rounded-lg text-white font-semibold shadow-lg`}>
                        <Flag className="w-4 h-4" />
                        {getUrgenciaIcon(ticketData.urgencia)} {ticketData.urgencia}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-white/60 mb-1">Categoría</div>
                      <div className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium">
                        {ticketData.categoria}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-white/60 mb-1">Reportado por</div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg">
                        <User className="w-4 h-4 text-cyan-300" />
                        <div>
                          <div className="text-white font-medium text-sm">{ticketData.usuario}</div>
                          <div className="text-white/60 text-xs">{ticketData.email}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-white/60 mb-1">Asignado a</div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-400/30 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          E
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">Esteban Umaña</div>
                          <div className="text-green-300 text-xs">Técnico Nivel 2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-cyan-300" />
                    <h3 className="text-lg font-bold text-white">Historial</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-white/20 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-white font-medium text-sm">Ticket Creado</div>
                        <div className="text-white/60 text-xs mt-1">Usuario reportó el problema</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-white/20 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-white font-medium text-sm">IA Analizó el Problema</div>
                        <div className="text-white/60 text-xs mt-1">Diagnóstico y solución generada</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-white/20 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-white font-medium text-sm">Usuario Solicitó Escalamiento</div>
                        <div className="text-white/60 text-xs mt-1">Solución IA no resolvió el problema</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">Asignado a Técnico Humano</div>
                        <div className="text-green-300 text-xs mt-1 font-semibold">En espera de atención ⏳</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de finalizar */}
                <button
                  onClick={handleFinalizar}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Ver en mis incidentes</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
