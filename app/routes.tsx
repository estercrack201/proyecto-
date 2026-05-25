import { createBrowserRouter } from 'react-router';
import Login from './pages/Login';
import PanelTecnico from './pages/PanelTecnico';
import SolicitudesAsignadas from './pages/SolicitudesAsignadas';
import DetalleIncidente from './pages/DetalleIncidente';
import DetalleEquipo from './pages/DetalleEquipo';
import RegistrarIncidente from './pages/RegistrarIncidente';
import RegistrarIncidenteIA from './pages/RegistrarIncidenteIA';
import AsistenteIA from './pages/AsistenteIA';
import DashboardEscalamiento from './pages/DashboardEscalamiento';
import ConsultarIncidentes from './pages/ConsultarIncidentes';
import GestionInventario from './pages/GestionInventario';
import RegistrarEquipo from './pages/RegistrarEquipo';
import Notificaciones from './pages/Notificaciones';
import Perfil from './pages/Perfil';
import Configuraciones from './pages/Configuraciones';
import Idioma from './pages/Idioma';
import Ayuda from './pages/Ayuda';
import Soporte from './pages/Soporte';
import PanelUsuario from './pages/PanelUsuario';
import GenerarTicketUsuario from './pages/GenerarTicketUsuario';
import ConsultarTicketsUsuario from './pages/ConsultarTicketsUsuario';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/panel',
    Component: PanelTecnico,
  },
  {
    path: '/solicitudes-asignadas',
    Component: SolicitudesAsignadas,
  },
  {
    path: '/detalle-incidente/:ticket',
    Component: DetalleIncidente,
  },
  {
    path: '/detalle-equipo/:id',
    Component: DetalleEquipo,
  },
  {
    path: '/registrar-incidente',
    Component: RegistrarIncidente,
  },
  {
    path: '/registrar-incidente-ia',
    Component: RegistrarIncidenteIA,
  },
  {
    path: '/asistente-ia',
    Component: AsistenteIA,
  },
  {
    path: '/dashboard-escalamiento',
    Component: DashboardEscalamiento,
  },
  {
    path: '/consultar-incidentes',
    Component: ConsultarIncidentes,
  },
  {
    path: '/gestion-inventario',
    Component: GestionInventario,
  },
  {
    path: '/registrar-equipo',
    Component: RegistrarEquipo,
  },
  {
    path: '/notificaciones',
    Component: Notificaciones,
  },
  {
    path: '/perfil',
    Component: Perfil,
  },
  {
    path: '/configuraciones',
    Component: Configuraciones,
  },
  {
    path: '/idioma',
    Component: Idioma,
  },
  {
    path: '/ayuda',
    Component: Ayuda,
  },
  {
    path: '/soporte',
    Component: Soporte,
  },
  {
    path: '/usuario/panel',
    Component: PanelUsuario,
  },
  {
    path: '/usuario/generar-ticket',
    Component: GenerarTicketUsuario,
  },
  {
    path: '/usuario/consultar-tickets',
    Component: ConsultarTicketsUsuario,
  },
]);