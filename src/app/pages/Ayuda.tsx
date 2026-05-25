import { HelpCircle, Book, Video, MessageSquare, FileText, Search } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Ayuda() {
  const [busqueda, setBusqueda] = useState('');

  const secciones = [
    {
      icono: Book,
      titulo: 'Guías de Usuario',
      descripcion: 'Manuales completos para usar el sistema',
      articulos: 12
    },
    {
      icono: Video,
      titulo: 'Tutoriales en Video',
      descripcion: 'Aprende visualmente paso a paso',
      articulos: 8
    },
    {
      icono: FileText,
      titulo: 'Preguntas Frecuentes',
      descripcion: 'Respuestas rápidas a dudas comunes',
      articulos: 25
    },
    {
      icono: MessageSquare,
      titulo: 'Comunidad',
      descripcion: 'Foro de discusión con otros usuarios',
      articulos: 156
    },
  ];

  const articulosPopulares = [
    '¿Cómo crear un nuevo ticket?',
    '¿Cómo asignar tickets a técnicos?',
    'Gestión de inventario de equipos',
    'Reportes y estadísticas del sistema',
    'Configuración de notificaciones',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header titulo="Centro de Ayuda" />
      <Sidebar />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-cyan-300" />
            Centro de Ayuda
          </h1>
          <p className="text-cyan-100/70 mb-8">Encuentra respuestas y aprende a usar InvenDesk Smart</p>

          {/* Barra de búsqueda */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar en la ayuda..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Secciones de ayuda */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {secciones.map((seccion, index) => {
              const Icon = seccion.icono;
              return (
                <div
                  key={index}
                  className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 hover:bg-white/15 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 p-3 rounded-xl group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{seccion.titulo}</h3>
                      <p className="text-cyan-100/70 text-sm mb-2">{seccion.descripcion}</p>
                      <p className="text-cyan-300 text-xs">{seccion.articulos} artículos</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Artículos populares */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Artículos Populares</h2>
            <div className="space-y-3">
              {articulosPopulares.map((articulo, index) => (
                <button
                  key={index}
                  className="w-full text-left p-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white group-hover:text-cyan-100">{articulo}</span>
                    <svg className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
