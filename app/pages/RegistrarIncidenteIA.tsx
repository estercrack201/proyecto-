import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, Send, User, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function RegistrarIncidenteIA() {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');

  const usuariosDisponibles = [
    { nombre: 'Karen Audrey Hoya Salinas', email: 'karen.hoya@empresa.com' },
    { nombre: 'Luis Fernando Gonzalez Guevara', email: 'luis.gonzalez@empresa.com' },
    { nombre: 'Esteban Alonso Umaña Velasquez', email: 'esteban.umana@empresa.com' },
    { nombre: 'Camilo Sarmiento Quintero', email: 'camilo.sarmiento@empresa.com' },
    { nombre: 'Maicol Stiben Bonilla', email: 'maicol.bonilla@empresa.com' },
  ];

  const handleUsuarioChange = (nombreUsuario: string) => {
    setUsuario(nombreUsuario);
    const usuarioSeleccionado = usuariosDisponibles.find(u => u.nombre === nombreUsuario);
    if (usuarioSeleccionado) {
      setEmail(usuarioSeleccionado.email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!descripcion || !categoria || !usuario) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    // Guardar datos en sessionStorage para la siguiente pantalla
    const ticketData = {
      descripcion,
      categoria,
      usuario,
      email,
      timestamp: new Date().toISOString()
    };

    sessionStorage.setItem('ticket_ia_temp', JSON.stringify(ticketData));

    // Navegar a la pantalla de análisis IA
    navigate('/asistente-ia');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      <Header titulo="Asistente IA SecurIT" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/panel" />

      <div className="md:ml-64 max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Header con branding IA */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-violet-700 p-4 rounded-2xl shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Asistente IA SecurIT</h1>
          <p className="text-cyan-200/80">Soporte inteligente disponible 24/7</p>
        </div>

        {/* Formulario principal */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-400/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">¿Cómo funciona?</h3>
                <p className="text-purple-100/80 text-sm">Describe tu problema y nuestra IA lo analizará instantáneamente para ofrecerte la mejor solución.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Usuario */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-300" />
                Identifícate *
              </label>
              <div className="relative">
                <select
                  value={usuario}
                  onChange={(e) => handleUsuarioChange(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-slate-900">Selecciona tu nombre</option>
                  {usuariosDisponibles.map((u) => (
                    <option key={u.email} value={u.nombre} className="bg-slate-900">
                      {u.nombre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
              </div>
              {email && (
                <p className="text-cyan-200/60 text-xs mt-2">{email}</p>
              )}
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Categoría del problema *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'Acceso', icon: '🔐', color: 'from-blue-600 to-cyan-600' },
                  { value: 'Hardware', icon: '💻', color: 'from-green-600 to-emerald-600' },
                  { value: 'Red', icon: '🌐', color: 'from-orange-600 to-red-600' },
                  { value: 'Software', icon: '⚙️', color: 'from-purple-600 to-pink-600' },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategoria(cat.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      categoria === cat.value
                        ? `bg-gradient-to-br ${cat.color} border-white/50 shadow-lg scale-105`
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="text-white text-sm font-medium">{cat.value}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Descripción del problema */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Describe tu problema *
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition resize-none"
                rows={6}
                placeholder="Ejemplo: No puedo entrar al software de nómina, me sale error de credenciales después de ingresar mi usuario y contraseña correcta..."
                required
              />
              <p className="text-white/40 text-xs mt-2">💡 Tip: Cuanto más detallado, mejor podrá ayudarte la IA</p>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <span>Enviar a IA para diagnóstico</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Info adicional */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-white/60 text-sm">
            🤖 La IA de SecurIT resolve el 70% de incidentes en menos de 2 minutos
          </p>
        </div>
      </div>
    </div>
  );
}
