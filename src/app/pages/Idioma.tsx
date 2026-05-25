import { Globe, Check } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Idioma() {
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('es');

  const idiomas = [
    { codigo: 'es', nombre: 'Español', bandera: '🇪🇸', nativo: 'Español' },
    { codigo: 'en', nombre: 'English', bandera: '🇺🇸', nativo: 'English' },
    { codigo: 'fr', nombre: 'Français', bandera: '🇫🇷', nativo: 'Français' },
    { codigo: 'de', nombre: 'Deutsch', bandera: '🇩🇪', nativo: 'Deutsch' },
    { codigo: 'pt', nombre: 'Português', bandera: '🇧🇷', nativo: 'Português' },
    { codigo: 'it', nombre: 'Italiano', bandera: '🇮🇹', nativo: 'Italiano' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Idioma" />
      <Sidebar />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Globe className="w-8 h-8 text-cyan-300" />
            Seleccionar Idioma
          </h1>
          <p className="text-cyan-100/70 mb-8">Elige el idioma de tu preferencia para la interfaz</p>

          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {idiomas.map((idioma) => (
                <button
                  key={idioma.codigo}
                  onClick={() => setIdiomaSeleccionado(idioma.codigo)}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    idiomaSeleccionado === idioma.codigo
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400 shadow-lg shadow-cyan-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{idioma.bandera}</span>
                      <div className="text-left">
                        <p className="text-white font-semibold">{idioma.nombre}</p>
                        <p className="text-cyan-100/60 text-sm">{idioma.nativo}</p>
                      </div>
                    </div>
                    {idiomaSeleccionado === idioma.codigo && (
                      <div className="bg-cyan-500 rounded-full p-1">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50 border border-white/20">
              Aplicar Cambios
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-6 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">Información</h3>
            <p className="text-cyan-100/70 text-sm">
              Los cambios de idioma se aplicarán inmediatamente a toda la interfaz del sistema.
              Si encuentras algún error de traducción, por favor repórtalo al equipo de soporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
