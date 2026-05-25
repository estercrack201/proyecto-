import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Send, Upload } from 'lucide-react';
import { saveTicket } from '../utils/ticketsStorage';

export default function GenerarTicketUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    asunto: '',
    categoria: '',
    prioridad: 'Media',
    descripcion: '',
    equipo: '',
    ubicacion: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.asunto || !formData.categoria || !formData.descripcion || !formData.equipo || !formData.ubicacion) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    // Guardar el ticket como usuario final
    const nuevoTicket = saveTicket({
      equipo: formData.equipo,
      descripcion: `${formData.asunto} - ${formData.descripcion}`,
      usuario: 'Usuario Final',
      email: 'cliente@invendesk.com',
      departamento: 'Solicitante',
      ubicacion: formData.ubicacion,
      prioridad: formData.prioridad,
      categoria: formData.categoria,
      tecnicoAsignado: 'Sin asignar'
    });

    alert(`✅ Ticket creado exitosamente\n\nNúmero de ticket: ${nuevoTicket.ticket}\nSu solicitud será atendida pronto.`);
    navigate('/usuario/consultar-tickets');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Generar Ticket de Soporte" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/usuario/panel" />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-4 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Nueva Solicitud de Soporte</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Asunto */}
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.asunto}
                  onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="Ej: Problema con impresora de oficina"
                />
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-2">
                  Categoría *
                </label>
                <select
                  required
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="" className="bg-blue-950">Seleccionar categoría</option>
                  <option value="Hardware" className="bg-blue-950">Hardware</option>
                  <option value="Software" className="bg-blue-950">Software</option>
                  <option value="Red" className="bg-blue-950">Conectividad/Red</option>
                  <option value="Acceso" className="bg-blue-950">Acceso a sistemas</option>
                  <option value="Otro" className="bg-blue-950">Otro</option>
                </select>
              </div>

              {/* Equipo afectado */}
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-2">
                  Equipo afectado *
                </label>
                <input
                  type="text"
                  required
                  value={formData.equipo}
                  onChange={(e) => setFormData({...formData, equipo: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="Ej: PC Oficina 5, Laptop Dell 3"
                />
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-2">
                  Ubicación *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="Ej: Piso 3, Oficina 305"
                />
              </div>

              {/* Prioridad */}
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-2">
                  Prioridad
                </label>
                <div className="flex gap-3">
                  {['Baja', 'Media', 'Alta', 'Urgente'].map((prioridad) => (
                    <button
                      key={prioridad}
                      type="button"
                      onClick={() => setFormData({...formData, prioridad})}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        formData.prioridad === prioridad
                          ? 'bg-cyan-500/30 border-2 border-cyan-400 text-cyan-100'
                          : 'bg-white/5 border border-white/20 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {prioridad}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-2">
                  Descripción del problema *
                </label>
                <textarea
                  required
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  placeholder="Describe detalladamente el problema que estás experimentando..."
                />
              </div>

              {/* Adjuntar archivos */}
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-2">
                  Adjuntar archivos (opcional)
                </label>
                <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-cyan-400/50 transition cursor-pointer">
                  <Upload className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
                  <p className="text-sm text-white/70">
                    Haz clic o arrastra archivos aquí
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    Máximo 10MB - Imágenes, documentos o videos
                  </p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar Ticket
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/usuario/panel')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-medium transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
