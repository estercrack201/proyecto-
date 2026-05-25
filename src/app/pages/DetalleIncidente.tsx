import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Save, AlertTriangle, User, Calendar, Monitor, FileText, Clock, MessageSquare, History, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function DetalleIncidente() {
  const navigate = useNavigate();
  const { ticket } = useParams();
  const ticketFormateado = ticket ? (ticket.startsWith('#') ? ticket : `#${ticket}`) : '#1045';
  const [diagnostico, setDiagnostico] = useState('');
  const [solucion, setSolucion] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [estadoTicket, setEstadoTicket] = useState('En proceso');

  // Datos del incidente (simulados)
  const incidenteData = {
    ticket: ticketFormateado,
    equipo: 'PC Oficina 1',
    usuario: 'Karen Audrey Hoya Salinas',
    email: 'karen.hoya@empresa.com',
    departamento: 'Recursos Humanos',
    fecha: '16/03/2026',
    hora: '09:30 AM',
    prioridad: 'Alta',
    categoria: 'Hardware',
    ubicacion: 'Piso 2, Oficina 201',
    descripcion: 'El equipo no enciende al presionar el botón de encendido. No hay señales de vida ni luces indicadoras. Se escuchó un sonido extraño antes de que dejara de funcionar.',
    estado: estadoTicket
  };

  // Historial de actividades
  const historial = [
    { fecha: '16/03/2026 09:30 AM', usuario: 'Karen Audrey Hoya Salinas', accion: 'Ticket creado', tipo: 'creacion' },
    { fecha: '16/03/2026 10:15 AM', usuario: 'Sistema', accion: 'Ticket asignado a Esteban Alonso Umaña Velasquez (Técnico)', tipo: 'asignacion' },
    { fecha: '16/03/2026 11:00 AM', usuario: 'Esteban Alonso Umaña Velasquez', accion: 'Estado cambiado a "En proceso"', tipo: 'actualizacion' },
  ];

  // Comentarios
  const [comentarios, setComentarios] = useState([
    { id: 1, fecha: '16/03/2026 11:05 AM', usuario: 'Esteban Alonso Umaña Velasquez', rol: 'Técnico', texto: 'He revisado el equipo. Parece ser un problema con la fuente de poder. Procediendo a realizar pruebas.' },
    { id: 2, fecha: '16/03/2026 02:30 PM', usuario: 'Karen Audrey Hoya Salinas', rol: 'Usuario', texto: '¿Hay alguna estimación de cuándo estará listo? Necesito el equipo para un reporte urgente.' },
  ]);

  const handleRegistrarSolucion = () => {
    if (!diagnostico || !solucion) {
      alert('Por favor complete el diagnóstico y la solución antes de registrar.');
      return;
    }
    setEstadoTicket('Resuelto');
    alert('Solución registrada exitosamente. El ticket ha sido marcado como resuelto.');
    setTimeout(() => navigate('/solicitudes-asignadas'), 1500);
  };

  const handleEscalar = () => {
    const confirmacion = confirm('¿Está seguro que desea escalar este incidente al siguiente nivel de soporte?');
    if (confirmacion) {
      alert('Incidente escalado al siguiente nivel de soporte.');
      navigate('/solicitudes-asignadas');
    }
  };

  const handleAgregarComentario = () => {
    if (!nuevoComentario.trim()) return;
    
    const comentario = {
      id: comentarios.length + 1,
      fecha: new Date().toLocaleString('es-MX', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      usuario: 'Esteban Alonso Umaña Velasquez',
      rol: 'Técnico',
      texto: nuevoComentario
    };
    
    setComentarios([...comentarios, comentario]);
    setNuevoComentario('');
  };

  const getPrioridadColor = (prioridad: string) => {
    if (prioridad === 'Alta') return 'bg-red-50 text-red-700 border-red-200';
    if (prioridad === 'Media') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-green-50 text-green-700 border-green-200';
  };

  const getEstadoIcon = (tipo: string) => {
    if (tipo === 'creacion') return <CheckCircle className="w-4 h-4 text-blue-500" />;
    if (tipo === 'asignacion') return <User className="w-4 h-4 text-purple-500" />;
    if (tipo === 'actualizacion') return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <Clock className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header titulo="Detalle del incidente" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/solicitudes-asignadas" />

      <div className="md:ml-64 max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Información principal del incidente */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                Información del incidente
              </h2>
              <p className="text-sm text-gray-500 mt-1">Ticket {incidenteData.ticket}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPrioridadColor(incidenteData.prioridad)}`}>
              Prioridad {incidenteData.prioridad}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-blue-600" />
                <p className="text-xs font-medium text-blue-900">Equipo afectado</p>
              </div>
              <p className="text-lg font-bold text-blue-600">{incidenteData.equipo}</p>
              <p className="text-xs text-blue-600 mt-1">{incidenteData.ubicacion}</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-purple-600" />
                <p className="text-xs font-medium text-purple-900">Usuario reportante</p>
              </div>
              <p className="text-lg font-bold text-purple-600">{incidenteData.usuario}</p>
              <p className="text-xs text-purple-600 mt-1">{incidenteData.email}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <p className="text-xs font-medium text-green-900">Fecha y hora</p>
              </div>
              <p className="text-lg font-bold text-green-600">{incidenteData.fecha}</p>
              <p className="text-xs text-green-600 mt-1">{incidenteData.hora}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Categoría</p>
              <p className="text-sm font-semibold text-gray-900">{incidenteData.categoria}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Departamento</p>
              <p className="text-sm font-semibold text-gray-900">{incidenteData.departamento}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-2">Descripción del problema</p>
            <p className="text-sm text-gray-900 leading-relaxed">
              {incidenteData.descripcion}
            </p>
          </div>
        </div>

        {/* Sección de comentarios */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-cyan-100 p-2 rounded-lg">
              <MessageSquare className="w-6 h-6 text-cyan-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Comentarios y seguimiento
            </h2>
            <span className="ml-auto bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold">
              {comentarios.length} comentarios
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {comentarios.map((com) => (
              <div key={com.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                      {com.usuario.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{com.usuario}</p>
                      <p className="text-xs text-gray-500">{com.rol}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{com.fecha}</p>
                </div>
                <p className="text-sm text-gray-700 ml-10">{com.texto}</p>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Agregar comentario</label>
            <textarea
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              rows={3}
              placeholder="Escriba su comentario aquí..."
            />
            <button
              onClick={handleAgregarComentario}
              className="mt-3 flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              Publicar comentario
            </button>
          </div>
        </div>

        {/* Historial de actividades */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-orange-100 p-2 rounded-lg">
              <History className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Historial de actividades
            </h2>
          </div>

          <div className="space-y-3">
            {historial.map((item, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="mt-1">
                  {getEstadoIcon(item.tipo)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{item.accion}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.usuario} • {item.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gestión del incidente */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-green-100 p-2 rounded-lg">
              <Save className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Gestión del incidente
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagnóstico técnico</label>
              <textarea
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                rows={4}
                placeholder="Escriba el diagnóstico detallado del problema identificado..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Solución aplicada</label>
              <textarea
                value={solucion}
                onChange={(e) => setSolucion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                rows={4}
                placeholder="Describa la solución aplicada y las acciones tomadas..."
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <button
                onClick={handleRegistrarSolucion}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition shadow-md hover:shadow-lg"
              >
                <Save className="w-5 h-5" />
                Registrar solución y cerrar ticket
              </button>
              <button
                onClick={handleEscalar}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-orange-500 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition"
              >
                <AlertTriangle className="w-5 h-5" />
                Escalar a nivel superior
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}