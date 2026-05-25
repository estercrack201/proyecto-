import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Package, Plus, Eye, Edit } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function GestionInventario() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const equipos = [
    { id: 'EQ001', nombre: 'PC Oficina 1', tipo: 'Computadora', serie: 'SN12345', estado: 'Operativo', ubicacion: 'Oficina 101' },
    { id: 'EQ002', nombre: 'Laptop 3', tipo: 'Laptop', serie: 'SN12346', estado: 'En reparación', ubicacion: 'Oficina 205' },
    { id: 'EQ003', nombre: 'Impresora 2', tipo: 'Impresora', serie: 'SN12347', estado: 'Operativo', ubicacion: 'Sala de impresión' },
    { id: 'EQ004', nombre: 'Monitor 5', tipo: 'Monitor', serie: 'SN12348', estado: 'Operativo', ubicacion: 'Oficina 102' },
    { id: 'EQ005', nombre: 'Servidor 1', tipo: 'Servidor', serie: 'SN12349', estado: 'Operativo', ubicacion: 'Data Center' },
  ];

  const getEstadoColor = (estado: string) => {
    if (estado === 'Operativo') return 'bg-green-100 text-green-800';
    if (estado === 'En reparación') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header titulo="Gestión de Inventario" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/panel" />

      <div className="md:ml-64 max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={() => navigate('/registrar-equipo')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-medium hover:from-orange-700 hover:to-orange-800 transition shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Registrar equipo
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="Buscar equipo..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Package className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Inventario de equipos tecnológicos
          </h2>
          <span className="ml-auto bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {equipos.length} equipos
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Nombre del equipo</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Número de serie</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Estado</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Ubicación</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((eq) => (
                  <tr key={eq.id} className="border-b border-gray-100 hover:bg-orange-50/30 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{eq.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{eq.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{eq.tipo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{eq.serie}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(eq.estado)}`}>
                        {eq.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{eq.ubicacion}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate(`/detalle-equipo/${eq.id}`)}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-xs font-medium">
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}