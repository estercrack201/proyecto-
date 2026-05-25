import { User, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Perfil() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Perfil de Usuario" />
      <Sidebar />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Tarjeta principal de perfil */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 mb-6">
            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/30 blur-2xl rounded-full"></div>
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">Esteban Alonso Umaña Velasquez</h1>
                <p className="text-cyan-100/80 mb-1">Técnico de Soporte TI</p>
                <div className="flex items-center gap-2 text-cyan-300/70">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Nivel de acceso: Técnico</span>
                </div>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 text-white/90">
                  <Mail className="w-5 h-5 text-cyan-300" />
                  <div>
                    <p className="text-xs text-cyan-100/60 mb-1">Correo electrónico</p>
                    <p className="font-medium">esteban.umana@invendesk.com</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 text-white/90">
                  <Phone className="w-5 h-5 text-cyan-300" />
                  <div>
                    <p className="text-xs text-cyan-100/60 mb-1">Teléfono</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 text-white/90">
                  <MapPin className="w-5 h-5 text-cyan-300" />
                  <div>
                    <p className="text-xs text-cyan-100/60 mb-1">Ubicación</p>
                    <p className="font-medium">Oficina Central - Piso 3</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-5 h-5 text-cyan-300" />
                  <div>
                    <p className="text-xs text-cyan-100/60 mb-1">Fecha de ingreso</p>
                    <p className="font-medium">15 de Enero, 2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de editar perfil */}
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50 border border-white/20">
              Editar Perfil
            </button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">47</p>
              <p className="text-cyan-100/70 text-sm">Tickets Resueltos</p>
            </div>
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">12</p>
              <p className="text-cyan-100/70 text-sm">Tickets Activos</p>
            </div>
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">95%</p>
              <p className="text-cyan-100/70 text-sm">Tasa de Satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
