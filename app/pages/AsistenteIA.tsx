import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, CheckCircle, XCircle, Loader2, Brain, ArrowRight, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { saveTicket } from '../utils/ticketsStorage';

export default function AsistenteIA() {
  const navigate = useNavigate();
  const [analizando, setAnalizando] = useState(true);
  const [ticketData, setTicketData] = useState<any>(null);
  const [solucionGenerada, setSolucionGenerada] = useState<any>(null);

  useEffect(() => {
    // Cargar datos del ticket
    const data = sessionStorage.getItem('ticket_ia_temp');
    if (!data) {
      navigate('/registrar-incidente-ia');
      return;
    }

    const ticket = JSON.parse(data);
    setTicketData(ticket);

    // Simular análisis de IA (2.5 segundos)
    setTimeout(() => {
      const solucion = generarSolucionIA(ticket.categoria, ticket.descripcion);
      setSolucionGenerada(solucion);
      setAnalizando(false);
    }, 2500);
  }, [navigate]);

  const generarSolucionIA = (categoria: string, descripcion: string) => {
    const soluciones: Record<string, any> = {
      'Acceso': {
        diagnostico: 'Problema de autenticación detectado',
        resumen: 'He identificado un problema de acceso al sistema relacionado con credenciales.',
        pasos: [
          'Verifica que tu usuario y contraseña sean correctos (distingue mayúsculas y minúsculas)',
          'Asegúrate de estar conectado a la VPN corporativa',
          'Limpia la caché del navegador y cookies',
          'Intenta restablecer tu contraseña desde el portal de autoservicio'
        ],
        urgencia: 'Media',
        tiempoEstimado: '5 minutos'
      },
      'Hardware': {
        diagnostico: 'Fallo de hardware identificado',
        resumen: 'He detectado un posible problema físico con el equipo.',
        pasos: [
          'Verifica todas las conexiones de cables y alimentación',
          'Reinicia el equipo completamente (apagar y encender)',
          'Revisa que no haya componentes sueltos o dañados visualmente',
          'Intenta con otro cable de alimentación si está disponible'
        ],
        urgencia: 'Alta',
        tiempoEstimado: '10 minutos'
      },
      'Red': {
        diagnostico: 'Problema de conectividad de red',
        resumen: 'He identificado un problema de conexión a la red.',
        pasos: [
          'Verifica que el cable de red esté correctamente conectado',
          'Reinicia el router o switch de red',
          'Desconecta y vuelve a conectar el WiFi',
          'Ejecuta el diagnóstico de red de Windows (cmd: ipconfig /release y ipconfig /renew)'
        ],
        urgencia: 'Media',
        tiempoEstimado: '8 minutos'
      },
      'Software': {
        diagnostico: 'Error de software detectado',
        resumen: 'He identificado un problema con la aplicación o software.',
        pasos: [
          'Cierra completamente la aplicación y vuelve a abrirla',
          'Verifica que tengas la versión más reciente instalada',
          'Reinicia tu equipo',
          'Desinstala y vuelve a instalar la aplicación si el problema persiste'
        ],
        urgencia: 'Baja',
        tiempoEstimado: '7 minutos'
      }
    };

    return soluciones[categoria] || soluciones['Software'];
  };

  const handleSolucionado = () => {
    if (!ticketData || !solucionGenerada) return;

    // Guardar ticket como resuelto por IA
    const nuevoTicket = saveTicket({
      equipo: 'Auto-diagnóstico IA',
      descripcion: ticketData.descripcion,
      usuario: ticketData.usuario,
      email: ticketData.email,
      departamento: 'Auto-servicio',
      ubicacion: 'Remoto',
      prioridad: solucionGenerada.urgencia,
      categoria: ticketData.categoria,
      tecnicoAsignado: 'IA SecurIT (Resuelto)'
    });

    // Marcar como cerrado
    setTimeout(() => {
      alert(`✅ ¡Genial! Hemos registrado esta solución para ayudar a otros compañeros.\n\nTicket ${nuevoTicket.ticket} cerrado exitosamente.`);
      sessionStorage.removeItem('ticket_ia_temp');
      navigate('/panel');
    }, 500);
  };

  const handleEscalar = () => {
    if (!ticketData || !solucionGenerada) return;

    // Guardar diagnóstico para escalamiento
    const escalamientoData = {
      ...ticketData,
      diagnosticoIA: solucionGenerada.diagnostico,
      resumenIA: solucionGenerada.resumen,
      pasosIntentados: solucionGenerada.pasos,
      urgencia: solucionGenerada.urgencia,
      categoria: ticketData.categoria
    };

    sessionStorage.setItem('ticket_escalamiento', JSON.stringify(escalamientoData));
    navigate('/dashboard-escalamiento');
  };

  if (!ticketData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      <Header titulo="Análisis IA en Proceso" />
      <Sidebar mostrarBotonVolver={false} />

      <div className="md:ml-64 max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Estado de análisis */}
        {analizando && (
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-violet-700 p-6 rounded-full shadow-xl">
                <Brain className="w-16 h-16 text-white animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">IA SecurIT analizando...</h2>
            </div>

            <p className="text-cyan-200/80 text-lg mb-6">Procesando tu solicitud con inteligencia artificial</p>

            <div className="max-w-md mx-auto bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Analizando descripción del problema...</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                  <span className="text-sm">Consultando base de conocimientos...</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
                  <span className="text-sm">Generando solución personalizada...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Solución generada */}
        {!analizando && solucionGenerada && (
          <div className="space-y-6">
            {/* Header de diagnóstico */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-400/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/30 p-3 rounded-xl">
                  <Sparkles className="w-8 h-8 text-purple-300" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{solucionGenerada.diagnostico}</h2>
                  <p className="text-purple-100/90">{solucionGenerada.resumen}</p>
                  <div className="flex gap-4 mt-4">
                    <div className="px-3 py-1 bg-white/10 rounded-lg text-sm text-white">
                      ⚡ Urgencia: <span className="font-semibold">{solucionGenerada.urgencia}</span>
                    </div>
                    <div className="px-3 py-1 bg-white/10 rounded-lg text-sm text-white">
                      ⏱️ Tiempo estimado: <span className="font-semibold">{solucionGenerada.tiempoEstimado}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pasos de solución */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-500/20 p-2 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Pasos recomendados</h3>
              </div>

              <div className="space-y-4">
                {solucionGenerada.pasos.map((paso: string, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <p className="text-white/90 flex-1 pt-1">{paso}</p>
                  </div>
                ))}
              </div>

              {/* Feedback del usuario */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/80 text-center mb-4 font-medium">¿La solución funcionó?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={handleSolucionado}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold shadow-xl hover:shadow-green-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>✅ ¡Funcionó! Cerrar ticket</span>
                    </div>
                  </button>

                  <button
                    onClick={handleEscalar}
                    className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-xl font-semibold shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      <span>❌ Solicitar técnico humano</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Info de escalamiento */}
            <div className="backdrop-blur-xl bg-orange-500/10 border border-orange-400/30 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5" />
                <p className="text-orange-100/90 text-sm">
                  <strong>¿Necesitas ayuda adicional?</strong> Si la solución no funciona, transferiremos automáticamente tu caso y todo el historial de diagnóstico a un técnico especializado. No tendrás que repetir la información.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
