# API Getonboard

API Rest para buscar empleos desde la pagina de [Getonboard](https://www.getonbrd.com/). Creado con Deno 🦕

## Inicio

A continuacion se muestran los comandos necesarios para ejecutar el proyecto

```bash
deno task prepare-husky # Preparar husky en el proyecto

deno task scrape # Preparar los datos necesarios que consumirá la API

deno task dev # Iniciar la API en modo desarrollo
```

## API

| Nombre   | Método | Ruta      |
| -------- | ------ | --------- |
| Get Jobs | GET    | /api/jobs |

Ejemplo de Respuesta

```js
{
  title: "Desarrollador(a) Full-Stack",
  role: "Semi Senior",
  time: "Full time",
  postulationFast: false,
  companyName: "3IT",
  location: "For Banco de Chile Santiago (hybrid)",
  url: "https://www.getonbrd.com/jobs/programming/desarrollador-a-full-stack-3it-santiago-ffac",
  perks: [
    "flexible hours",
    "computer provided",
    "informal dresscode",
    "beverages and snacks"
  ],
  isNew: true,
  hasPublishedSalary: true
}
```


## Como Contribuir

Antes de empezar a crear commits en el proyecto deberá ejecutar el siguiente comando para preparar husky, esto permitirá mantener el codigo siempre limpio antes de subir cualquier cambio.

```bash
deno task prepare-husky
```
Luego deberá subir su codigo a la rama `dev` y crear un PR a la rama `main`


## Licencia

[MIT](https://github.com/EdixonAlberto/api-getonboard/blob/main/LICENSE) &copy; Edixon Piña
