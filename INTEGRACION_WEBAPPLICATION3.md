# Wireframe React dentro de WebApplication3

Esta carpeta contiene el wireframe que venia de `C:\Users\alons\Desktop\kkk`.

No reemplaza el frontend Angular existente en `frontend`. Queda como una interfaz React/Vite separada para usar, adaptar o conectar con la API ASP.NET Core del proyecto.

## Ejecutar el wireframe

```powershell
cd C:\Users\alons\Desktop\WebApplication3\wireframe-react
npm run dev
```

Vite normalmente abre la app en:

```text
http://localhost:5173
```

## Ejecutar el backend

```powershell
cd C:\Users\alons\Desktop\WebApplication3\WebApplication3\WebApplication3
dotnet run
```

El backend ya permite CORS desde:

```text
http://localhost:4200
http://localhost:5173
```

## Siguiente paso

El wireframe todavia usa datos locales en algunas pantallas. Para convertirlo en frontend real, hay que reemplazar esos datos por llamadas a los endpoints del backend, por ejemplo `Equipos`, `Usuarios`, `Problemas`, `Soporte`, `Tecnicos` y `Sedes`.
