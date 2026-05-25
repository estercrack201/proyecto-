import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Save, Monitor, Package, MapPin, User } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function RegistrarEquipo() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [serie, setSerie] = useState('');
  const [estado, setEstado] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [responsable, setResponsable] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const equipoId = 'EQ' + Math.floor(100 + Math.random() * 900);
    alert(`Equipo registrado exitosamente. ID: ${equipoId}`);
    navigate('/gestion-inventario');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header titulo="Registrar equipo" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/gestion-inventario" />

      <div className="md:ml-64 max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Formulario de registro de equipo
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Tipo de equipo
                </label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  required
                >
                  <option value="">Seleccione tipo</option>
                  <option value="Computadora">Computadora</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Impresora">Impresora</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Servidor">Servidor</option>
                  <option value="Router">Router</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del dispositivo
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="Ej: PC Oficina 1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de serie
                </label>
                <input
                  type="text"
                  value={serie}
                  onChange={(e) => setSerie(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="Ej: SN12345"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  required
                >
                  <option value="">Seleccione estado</option>
                  <option value="Operativo">Operativo</option>
                  <option value="En reparación">En reparación</option>
                  <option value="Fuera de servicio">Fuera de servicio</option>
                  <option value="En mantenimiento">En mantenimiento</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ubicación
                </label>
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="Ej: Oficina 101"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Responsable
                </label>
                <input
                  type="text"
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="Nombre del responsable"
                  required
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-medium hover:from-orange-700 hover:to-orange-800 transition shadow-md hover:shadow-lg"
              >
                <Save className="w-5 h-5" />
                Guardar equipo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}