# Prueba técnica Cafler

## Getting Started

Instalar dependencias:

```
$  npm install
```

Iniciar en dev mode:

```
$ npm run dev
```

Iniciar los tests:

```
$ npm run test
```

## Definición

### Para la prueba se requiere realizar las siguientes tareas

-   ✅ Utilizar un repositorio de GitHub para subir todos los cambios que se hagan en el proyecto.
-   ✅ Crear proyecto con React y TS
-   ✅ Página de incio con pedidos.
-   ✅ Botón "Asignar" en página de inicio que redirige a página de asignación de pedidos
-   ✅ Página de asignación de pedidos muestra pedidos no asignados y repartidores. Cargará las rutas optimizadas
-   ✅ Permitir mover los pedidos entre repartidores
-   ✅ Botón "Guardar" que envía la nueva asignación
-   ✅ Gestión de errores de la API
-   ✅ Cabecera con navegación para volver a la página principal
-   ✅ Implementar tests unitarios
-   ✅ Utilizar librerías de funcionalidad o diseño
-   ✅ Implementar persistencia en el front
-   ✅ Reintentar la petición automáticamente si es un error 500 pero no si es un 400
-   ❔ Crear una implementación propia de GET /optimized-routes usando los criterios que consideres adecuados para intentar optimizar todavía más la ruta.
    -   He creado y desarrollado toda una lógica para este punto pero descnozco si es lo que se pedía, por lo que no la he acabado de implementar. La idea la desarrollé completamente y la podéis encontrar en /src/componentes/utils/utils.tsx
-   ✅ Maquetación de la aplicación

### Endpoints

-   URL: exam.development.cafler.com
-   GET: Pedidos: /orders
-   GET: Repartidores: /riders
-   GET: Rutas optimizadas: /optimized-routes
-   POST: Guardar rutas optimizadas: /route-updated
