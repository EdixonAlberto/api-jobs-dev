# API Getonboard

API Rest para buscar empleos desde la pagina de [Getonboard](https://www.getonbrd.com/). Creado con Deno 🦕

## Inicio

Antes de iniciar el proyecto debe crear un archivo `.env` en la raiz del proyecto, para esto compie la plantilla incorporada y cambie las variables que desee.
```bash
cp .env.template .env
```

Luego podrá iniciar el proyecto en modo desarrollo o producción.
```bash
# Inicia el servidor en modo desarrollo
deno task dev

# Inicia el servidor en modo producción
deno task start
```

## API

| Nombre   | Método | Ruta      |
| -------- | ------ | --------- |
| Get Jobs | GET    | /api/jobs |

Ejemplo de respuesta.
```js
{
  "total": 346,
  "jobs": [
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
    },
    { ... }
  ]
}
```

## Comandos
```bash
# Prepara los datos e inicia el servidor en modo desarrollo
deno task dev

# Inicia el servidor en modo producción
deno task start

# Prepara los datos necesarios que consumirá la API
deno task scrape

# Actualiza deno.lock para sincronizarlo con ./src/deps.ts
deno task update-lock

# Prepara husky en el proyecto
deno task prepare-husky
```

## Como Contribuir

Antes de empezar a crear commits en el proyecto deberá ejecutar el siguiente comando para preparar husky, esto permitirá mantener el codigo siempre limpio antes de subir cualquier cambio.
```bash
deno task prepare-husky
```
Luego deberá subir su codigo a la rama `dev` y crear un PR a la rama `main`.


## Licencia

[MIT](https://github.com/EdixonAlberto/api-getonboard/blob/main/LICENSE) &copy; Edixon Piña
