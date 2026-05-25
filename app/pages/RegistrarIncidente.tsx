import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FilePlus, Upload, Monitor, User, MapPin, Briefcase, Tag } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { saveTicket } from '../utils/ticketsStorage';

export default function RegistrarIncidente() {
  const navigate = useNavigate();
  const [equipo, setEquipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [categoria, setCategoria] = useState('');

  const equiposDisponibles = [
    { id: 'pc1', nombre: 'PC Oficina 1' },
    { id: 'laptop3', nombre: 'Laptop 3' },
    { id: 'impresora2', nombre: 'Impresora 2' },
    { id: 'monitor5', nombre: 'Monitor 5' },
    { id: 'servidor1', nombre: 'Servidor 1' },
  ];

  const usuariosDisponibles = [
    { nombre: 'Karen Audrey Hoya Salinas', email: 'karen.hoya@empresa.com', departamento: 'Recursos Humanos' },
    { nombre: 'Luis Fernando Gonzalez Guevara', email: 'luis.gonzalez@empresa.com', departamento: 'Finanzas' },
    { nombre: 'Esteban Alonso Umaña Velasquez', email: 'esteban.umana@empresa.com', departamento: 'Tecnología' },
    { nombre: 'Camilo Sarmiento Quintero', email: 'camilo.sarmiento@empresa.com', departamento: 'Operaciones' },
    { nombre: 'Maicol Stiben Bonilla', email: 'maicol.bonilla@empresa.com', departamento: 'Marketing' },
  ];

  const handleUsuarioChange = (nombreUsuario: string) => {
    setUsuario(nombreUsuario);
    const usuarioSeleccionado = usuariosDisponibles.find(u => u.nombre === nombreUsuario);
    if (usuarioSeleccionado) {
      setEmail(usuarioSeleccionado.email);
      setDepartamento(usuarioSeleccionado.departamento);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!equipo || !descripcion || !usuario || !prioridad || !categoria || !ubicacion) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const equipoNombre = equiposDisponibles.find(e => e.id === equipo)?.nombre || equipo;

    // Guardar el ticket
    const nuevoTicket = saveTicket({
      equipo: equipoNombre,
      descripcion,
      usuario,
      email,
      departamento,
      ubicacion,
      prioridad,
      categoria,
      archivo: archivo || undefined,
      tecnicoAsignado: 'Esteban Alonso Umaña Velasquez'
    });

    alert(`✅ Incidente registrado exitosamente\n\nNúmero de ticket: ${nuevoTicket.ticket}\nPrioridad: ${nuevoTicket.prioridad}\nEstado: ${nuevoTicket.estado}`);
    navigate('/consultar-incidentes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header titulo="Registrar incidente" />
      <Sidebar mostrarBotonVolver={true} rutaVolver="/panel" />

      <div className="md:ml-64 max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-green-100 p-2 rounded-lg">
              <FilePlus className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Formulario de registro
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Usuario reportante */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Usuario reportante *
              </label>
              <select
                value={usuario}
                onChange={(e) => handleUsuarioChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                required
              >
                <option value="">Seleccione un usuario</option>
                {usuariosDisponibles.map((u) => (
                  <option key={u.email} value={u.nombre}>
                    {u.nombre} - {u.departamento}
                  </option>
                ))}
              </select>
            </div>

            {/* Email (autocompletado) */}
            {email && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
            )}

            {/* Equipo afectado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Equipo afectado *
              </label>
              <select
                value={equipo}
                onChange={(e) => setEquipo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                required
              >
                <option value="">Seleccione un equipo</option>
                {equiposDisponibles.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Ubicación del equipo *
              </label>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="Ej: Piso 2, Oficina 201"
                required
              />
            </div>

            {/* Categoría y Prioridad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Categoría *
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  required
                >
                  <option value="">Seleccione categoría</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Red">Red</option>
                  <option value="Acceso">Acceso</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridad *
                </label>
                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  required
                >
                  <option value="">Seleccione prioridad</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del problema *
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                rows={6}
                placeholder="Describa detalladamente el problema reportado..."
                required
              />
            </div>

            {/* Adjuntar archivo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Adjuntar archivo (opcional)
              </label>
              <input
                type="text"
                value={archivo}
                onChange={(e) => setArchivo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="nombre_archivo.jpg"
              />
              <p className="text-xs text-gray-500 mt-2">Simulación de carga de archivo</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition shadow-md hover:shadow-lg"
              >
                <FilePlus className="w-5 h-5" />
                Registrar incidente
              </button>
              <button
                type="button"
                onClick={() => navigate('/panel')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}