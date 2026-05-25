import { Settings, Bell, Moon, Shield, Database, Palette } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Configuraciones() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Configuraciones" />
      <Sidebar />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Settings className="w-8 h-8 text-cyan-300" />
            Configuraciones del Sistema
          </h1>

          {/* Notificaciones */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-cyan-300" />
              <h2 className="text-xl font-semibold text-white">Notificaciones</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                <div>
                  <p className="text-white font-medium">Notificaciones por email</p>
                  <p className="text-sm text-cyan-100/70">Recibir actualizaciones de tickets por correo</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/20 peer-focus:ring-2 peer-focus:ring-cyan-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                <div>
                  <p className="text-white font-medium">Notificaciones push</p>
                  <p className="text-sm text-cyan-100/70">Alertas en tiempo real</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/20 peer-focus:ring-2 peer-focus:ring-cyan-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Apariencia */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-cyan-300" />
              <h2 className="text-xl font-semibold text-white">Apariencia</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl">
                <div>
                  <p className="text-white font-medium">Modo oscuro</p>
                  <p className="text-sm text-cyan-100/70">Tema actual del sistema</p>
                </div>
                <Moon className="w-6 h-6 text-cyan-300" />
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-cyan-300" />
              <h2 className="text-xl font-semibold text-white">Seguridad</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white">
                Cambiar contraseña
              </button>
              <button className="w-full text-left p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white">
                Autenticación de dos factores
              </button>
              <button className="w-full text-left p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white">
                Dispositivos conectados
              </button>
            </div>
          </div>

          {/* Datos */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-cyan-300" />
              <h2 className="text-xl font-semibold text-white">Datos y privacidad</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white">
                Descargar mis datos
              </button>
              <button className="w-full text-left p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-white">
                Privacidad de la cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
