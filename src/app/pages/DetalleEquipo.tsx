import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Monitor, Calendar, MapPin, Wrench, Package, FileText, History, Edit, AlertTriangle, CheckCircle, Cpu, HardDrive, MemoryStick } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function DetalleEquipo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modoEdicion, setModoEdicion] = useState(false);

  // Datos del equipo (simulados)
  const equipoData = {
    id: id || 'EQ001',
    nombre: 'PC Oficina 1',
    tipo: 'Computadora',
    marca: 'Dell',
    modelo: 'OptiPlex 7090',
    numeroSerie: 'SN12345678',
    estado: 'Operativo',
    ubicacion: 'Oficina 101',
    piso: 'Piso 2',
    responsable: 'María González',
    departamento: 'Recursos Humanos',
    fechaAdquisicion: '15/01/2024',
    garantiaHasta: '15/01/2027',
    proveedor: 'TechSupply S.A.',
    precio: '$15,000 MXN',
    descripcion: 'Computadora de escritorio para tareas administrativas y procesamiento de datos del departamento de Recursos Humanos.',
    // Especificaciones técnicas
    procesador: 'Intel Core i7-11700',
    ram: '16 GB DDR4',
    almacenamiento: '512 GB SSD',
    sistemaOperativo: 'Windows 11 Pro',
    direccionIP: '192.168.1.45',
    direccionMAC: 'AA:BB:CC:DD:EE:FF'
  };

  // Historial de mantenimiento
  const historialMantenimiento = [
    {
      fecha: '10/04/2026',
      tipo: 'Mantenimiento preventivo',
      tecnico: 'Luis Fernando Gonzalez Guevara',
      descripcion: 'Limpieza física, actualización de software, verificación de componentes.',
      estado: 'Completado'
    },
    {
      fecha: '20/02/2026',
      tipo: 'Reparación',
      tecnico: 'Camilo Sarmiento Quintero',
      descripcion: 'Reemplazo de ventilador debido a ruido excesivo.',
      estado: 'Completado'
    },
    {
      fecha: '05/11/2025',
      tipo: 'Actualización',
      tecnico: 'Maicol Stiben Bonilla',
      descripcion: 'Actualización de RAM de 8GB a 16GB.',
      estado: 'Completado'
    },
  ];

  // Tickets relacionados
  const ticketsRelacionados = [
    { ticket: '#1045', fecha: '16/03/2026', problema: 'No enciende el equipo', estado: 'En proceso' },
    { ticket: '#1010', fecha: '10/02/2026', problema: 'Ventilador ruidoso', estado: 'Cerrado' },
    { ticket: '#0985', fecha: '28/10/2025', problema: 'Lentitud en el sistema', estado: 'Cerrado' },
  ];

  const getEstadoColor = (estado: string) => {
    if (estado === 'Operativo') return 'bg-green-100 text-green-800 border-green-200';
    if (estado === 'En reparación') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (estado === 'Fuera de servicio') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTicketEstadoColor = (estado: string) => {
    if (estado === 'En proceso') return 'bg-blue-100 text-blue-800';
    if (estado === 'Cerrado') return 'bg-green-100 text-green-800';
    if (estado === 'Nuevo') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleGuardarCambios = () => {
    alert('Cambios guardados exitosamente.');
    setModoEdicion(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header titulo="Detalle del equipo" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/gestion-inventario" />

      <div className="md:ml-64 max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Información general del equipo */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Monitor className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {equipoData.nombre}
                </h2>
                <p className="text-sm text-gray-500 mt-1">ID: {equipoData.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getEstadoColor(equipoData.estado)}`}>
                {equipoData.estado}
              </span>
              <button
                onClick={() => setModoEdicion(!modoEdicion)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                <Edit className="w-4 h-4" />
                {modoEdicion ? 'Cancelar' : 'Editar'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-blue-600" />
                <p className="text-xs font-medium text-blue-900">Tipo de equipo</p>
              </div>
              <p className="text-lg font-bold text-blue-600">{equipoData.tipo}</p>
              <p className="text-xs text-blue-600 mt-1">{equipoData.marca} {equipoData.modelo}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <p className="text-xs font-medium text-purple-900">Ubicación</p>
              </div>
              <p className="text-lg font-bold text-purple-600">{equipoData.ubicacion}</p>
              <p className="text-xs text-purple-600 mt-1">{equipoData.piso}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <p className="text-xs font-medium text-green-900">Fecha de adquisición</p>
              </div>
              <p className="text-lg font-bold text-green-600">{equipoData.fechaAdquisicion}</p>
              <p className="text-xs text-green-600 mt-1">Garantía hasta: {equipoData.garantiaHasta}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Número de serie</p>
              <p className="text-sm font-semibold text-gray-900">{equipoData.numeroSerie}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Responsable</p>
              <p className="text-sm font-semibold text-gray-900">{equipoData.responsable} - {equipoData.departamento}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Proveedor</p>
              <p className="text-sm font-semibold text-gray-900">{equipoData.proveedor}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Valor de adquisición</p>
              <p className="text-sm font-semibold text-gray-900">{equipoData.precio}</p>
            </div>
          </div>
        </div>

        {/* Especificaciones técnicas */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-cyan-100 p-2 rounded-lg">
              <Cpu className="w-6 h-6 text-cyan-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Especificaciones técnicas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Cpu className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-xs font-medium text-gray-700">Procesador</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{equipoData.procesador}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <MemoryStick className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <p className="text-xs font-medium text-gray-700">Memoria RAM</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{equipoData.ram}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <HardDrive className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="text-xs font-medium text-gray-700">Almacenamiento</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{equipoData.almacenamiento}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Monitor className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <p className="text-xs font-medium text-gray-700">Sistema Operativo</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{equipoData.sistemaOperativo}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Package className="w-5 h-5 text-cyan-600 mt-1" />
              <div>
                <p className="text-xs font-medium text-gray-700">Dirección IP</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{equipoData.direccionIP}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Package className="w-5 h-5 text-pink-600 mt-1" />
              <div>
                <p className="text-xs font-medium text-gray-700">Dirección MAC</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{equipoData.direccionMAC}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-2">Descripción</p>
            <p className="text-sm text-gray-900 leading-relaxed">{equipoData.descripcion}</p>
          </div>
        </div>

        {/* Historial de mantenimiento */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Historial de mantenimiento
            </h2>
            <span className="ml-auto bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
              {historialMantenimiento.length} registros
            </span>
          </div>

          <div className="space-y-4">
            {historialMantenimiento.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.tipo}</p>
                      <p className="text-xs text-gray-500 mt-1">Técnico: {item.tecnico}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{item.fecha}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      {item.estado}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 pl-7">{item.descripcion}</p>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm font-medium">
            <Wrench className="w-4 h-4" />
            Registrar nuevo mantenimiento
          </button>
        </div>

        {/* Tickets relacionados */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-red-100 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Tickets relacionados
            </h2>
            <span className="ml-auto bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
              {ticketsRelacionados.length} tickets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Ticket</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Fecha</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Problema</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Estado</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ticketsRelacionados.map((ticket, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{ticket.ticket}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ticket.fecha}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{ticket.problema}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTicketEstadoColor(ticket.estado)}`}>
                        {ticket.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/detalle-incidente/${ticket.ticket.replaceAll('#', '')}`)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {modoEdicion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Editar información del equipo</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado del equipo</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none">
                    <option>Operativo</option>
                    <option>En reparación</option>
                    <option>Fuera de servicio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                  <input
                    type="text"
                    defaultValue={equipoData.ubicacion}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Responsable</label>
                  <input
                    type="text"
                    defaultValue={equipoData.responsable}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleGuardarCambios}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Guardar cambios
                  </button>
                  <button
                    onClick={() => setModoEdicion(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
