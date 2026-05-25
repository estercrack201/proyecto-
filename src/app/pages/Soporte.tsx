import { HeadphonesIcon, Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Soporte() {
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado al equipo de soporte. Te responderemos pronto.');
    setAsunto('');
    setMensaje('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Soporte Técnico" />
      <Sidebar />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <HeadphonesIcon className="w-8 h-8 text-cyan-300" />
            Soporte Técnico
          </h1>
          <p className="text-cyan-100/70 mb-8">Estamos aquí para ayudarte</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Contacto por Email */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 text-center">
              <div className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-cyan-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-cyan-100/70 text-sm mb-3">soporte@invendesk.com</p>
              <p className="text-cyan-300 text-xs">Respuesta en 24 horas</p>
            </div>

            {/* Contacto por Teléfono */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 text-center">
              <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Teléfono</h3>
              <p className="text-cyan-100/70 text-sm mb-3">+1 (555) 987-6543</p>
              <p className="text-green-300 text-xs">Lun-Vie 9:00-18:00</p>
            </div>

            {/* Chat en Vivo */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 text-center">
              <div className="bg-gradient-to-br from-purple-500/30 to-violet-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Chat en Vivo</h3>
              <p className="text-cyan-100/70 text-sm mb-3">Disponible ahora</p>
              <button className="text-purple-300 text-xs hover:text-purple-200 transition">Iniciar chat</button>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-4 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Enviar un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Asunto</label>
                <input
                  type="text"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Mensaje</label>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition resize-none"
                  rows={6}
                  placeholder="Describe tu problema o consulta detalladamente..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2 border border-white/20"
              >
                <Send className="w-5 h-5" />
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Información adicional */}
          <div className="mt-6 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">Antes de contactarnos</h3>
            <ul className="text-cyan-100/70 text-sm space-y-2">
              <li>• Revisa nuestro Centro de Ayuda para encontrar respuestas rápidas</li>
              <li>• Ten a mano tu número de usuario y detalles del problema</li>
              <li>• Incluye capturas de pantalla si es posible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
