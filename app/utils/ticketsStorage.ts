// Sistema de almacenamiento de tickets usando localStorage

export interface Ticket {
  ticket: string;
  equipo: string;
  descripcion: string;
  estado: string;
  fecha: string;
  fechaAsignacion?: string;
  usuario: string;
  email: string;
  prioridad: string;
  categoria: string;
  departamento: string;
  ubicacion: string;
  hora: string;
  archivo?: string;
  tecnicoAsignado?: string;
}

// Función para obtener todos los tickets
export const getTickets = (): Ticket[] => {
  if (typeof window === 'undefined') return [];
  const tickets = localStorage.getItem('invendesk_tickets');
  return tickets ? JSON.parse(tickets) : [];
};

// Función para guardar un nuevo ticket
export const saveTicket = (ticketData: Omit<Ticket, 'ticket' | 'fecha' | 'hora' | 'estado'>): Ticket => {
  const tickets = getTickets();

  // Generar número de ticket único
  const ticketNumber = '#' + (1053 + tickets.length);

  // Obtener fecha y hora actuales
  const now = new Date();
  const fecha = now.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const hora = now.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Crear el nuevo ticket
  const nuevoTicket: Ticket = {
    ticket: ticketNumber,
    fecha,
    hora,
    estado: 'Nuevo',
    fechaAsignacion: fecha,
    ...ticketData
  };

  // Guardar en localStorage
  tickets.unshift(nuevoTicket); // Agregar al inicio
  localStorage.setItem('invendesk_tickets', JSON.stringify(tickets));

  return nuevoTicket;
};

// Función para actualizar un ticket existente
export const updateTicket = (ticketNumber: string, updates: Partial<Ticket>): void => {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.ticket === ticketNumber);

  if (index !== -1) {
    tickets[index] = { ...tickets[index], ...updates };
    localStorage.setItem('invendesk_tickets', JSON.stringify(tickets));
  }
};

// Función para obtener un ticket específico
export const getTicket = (ticketNumber: string): Ticket | undefined => {
  const tickets = getTickets();
  return tickets.find(t => t.ticket === ticketNumber || t.ticket === `#${ticketNumber}`);
};

// Función para eliminar un ticket
export const deleteTicket = (ticketNumber: string): void => {
  const tickets = getTickets();
  const filteredTickets = tickets.filter(t => t.ticket !== ticketNumber);
  localStorage.setItem('invendesk_tickets', JSON.stringify(filteredTickets));
};

// Función para obtener tickets por estado
export const getTicketsByEstado = (estado: string): Ticket[] => {
  const tickets = getTickets();
  return tickets.filter(t => t.estado === estado);
};

// Función para limpiar todos los tickets (útil para desarrollo)
export const clearAllTickets = (): void => {
  localStorage.removeItem('invendesk_tickets');
};
