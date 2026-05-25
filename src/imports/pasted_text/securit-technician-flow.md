Diseña un conjunto de wireframes de baja fidelidad para una aplicación web llamada **SecurIT – Sistema Inteligente de Inventario y Mesa de Ayuda para Gestión de Equipos de Cómputo**.

El diseño debe representar el **flujo completo del rol Técnico** dentro del sistema. El estilo debe ser **wireframe simple (low-fidelity)** con cajas, botones y tablas básicas.

El sistema debe incluir navegación entre pantallas basada en los siguientes botones.

---

PANTALLA 1 – LOGIN

Elementos:

Título del sistema:
"SecurIT – Sistema de Inventario y Mesa de Ayuda"

Campos de formulario:

Usuario
[ campo de texto ]

Contraseña
[ campo de texto ]

Botón:
[ Iniciar sesión ]

Comportamiento:

Si el usuario tiene rol **Técnico**, el sistema lo redirige al **Panel del Técnico**.

---

PANTALLA 2 – PANEL DEL TÉCNICO

Encabezado superior:

Nombre del sistema: SecurIT
Usuario conectado: Técnico

Secciones del panel:

Gestión de incidentes

Botones:

[ Ver solicitudes asignadas ]

[ Registrar incidente ]

[ Consultar incidentes ]

Gestión de inventario

Botón:

[ Gestión de inventario ]

Sistema

Botón:

[ Cerrar sesión ]

Debajo del panel mostrar una tabla llamada **Solicitudes recientes** con columnas:

Ticket
Equipo
Estado

---

PANTALLA 3 – VER SOLICITUDES ASIGNADAS

Esta pantalla muestra los incidentes que el técnico tiene asignados.

Elementos:

Tabla con columnas:

Ticket
Equipo
Descripción del problema
Estado
Acciones

Botón en cada fila:

[ Ver detalle ]

Al seleccionar **Ver detalle**, se abre la pantalla de **Detalle del incidente**.

---

PANTALLA 4 – DETALLE DEL INCIDENTE

Mostrar la información completa del incidente.

Campos visibles:

Ticket
Equipo
Usuario que reportó
Descripción del problema

Secciones:

Diagnóstico
[ campo de texto ]

Solución aplicada
[ campo de texto ]

Botones:

[ Registrar solución ]
[ Escalar incidente ]

Registrar solución cambia el estado del ticket a **Cerrado**.

---

PANTALLA 5 – REGISTRAR INCIDENTE

Formulario para crear un nuevo incidente.

Campos:

Seleccionar equipo
[ lista desplegable ]

Descripción del problema
[ campo de texto grande ]

Adjuntar archivo
[ botón subir archivo ]

Botón principal:

[ Registrar incidente ]

Al registrar el incidente, el sistema genera un **número de ticket**.

---

PANTALLA 6 – CONSULTAR INCIDENTES

Pantalla para visualizar todos los incidentes del sistema.

Elementos:

Barra de búsqueda
[ Buscar ticket o equipo ]

Filtros:

Estado del incidente
[ Nuevo / En proceso / Cerrado ]

Tabla con columnas:

Ticket
Equipo
Estado
Fecha
Acciones

Botón por fila:

[ Ver detalle ]

---

PANTALLA 7 – GESTIÓN DE INVENTARIO

Pantalla para administrar los equipos tecnológicos.

Botones superiores:

[ Registrar equipo ]
[ Buscar equipo ]

Tabla de inventario con columnas:

ID
Nombre del equipo
Tipo
Número de serie
Estado
Ubicación
Acciones

Acciones disponibles:

[ Ver ]
[ Editar ]

---

PANTALLA 8 – REGISTRAR EQUIPO

Formulario para agregar un equipo al inventario.

Campos:

Tipo de equipo
Nombre del dispositivo
Número de serie
Estado
Ubicación
Responsable

Botón:

[ Guardar equipo ]

---

PANTALLA 9 – CERRAR SESIÓN

Al presionar el botón **Cerrar sesión**, el sistema debe regresar a la pantalla de **Login**.

---

Objetivo del diseño:

Representar el flujo completo de interacción del **técnico dentro de un sistema de mesa de ayuda y gestión de inventario**, mostrando cómo navega entre las funciones principales del sistema.
