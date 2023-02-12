# API Getonboard

API Rest para buscar empleos desde la pagina de [Getonboard](https://www.getonbrd.com/). Creado con Deno 🦕

## Inicio

Para iniciar el proyecto debe escribir uno de los siguientes comandos.
```bash
# Inicia el servidor en modo desarrollo
deno task dev

# Inicia el servidor en modo producción
deno task start
```
Para cambiar la configuración por defecto debe crear un archivo `.env` en la raiz del proyecto, para esto compie la plantilla incorporada y cambie las variables que desee.
```bash
cp .env.template .env
```

## API

| Nombre   | Método | Ruta      |
| -------- | ------ | --------- |
| Get Jobs | GET    | /api/jobs |

Ejemplo de respuesta.

```json
{
  "total": 346,
  "jobs": [
    {
      "title": "Java Developer (+3 Years of Experience)",
      "role": "Senior",
      "time": "Full time",
      "postulationFast": true,
      "companyName": "Softserve",
      "location": "Remote (Chile)",
      "url": "https://www.getonbrd.com/jobs/programming/java-developer-3-years-of-experience-softserve-santiago",
      "perks": [
        "pet friendly",
        "flexible hours",
        "health coverage",
        "computer provided",
        "informal dresscode",
        "vacation over legal",
        "beverages and snacks"
      ],
      "isNew": false,
      "hasPublishedSalary": true,
      "details": {
        "postulations": 25
      }
    },
    { ... }
  ]
}
```
## Demo

En la ruta [/demo](./demo/) se encuentra el código fuente de una página de demostración la cual consume la API y muestra los resultados en una interfaz elegante. Esta página ha sido creada con el framework `fresh` y puede ser ejecutada con el comando:
```bash
deno task demo
```

## Lista de Comandos
```bash
# Prepara los datos e inicia el servidor en modo desarrollo
deno task dev

# Inicia el servidor en modo producción
deno task start

# Prepara los datos necesarios que consumirá la API
deno task scrape

# Actualiza deno.lock para sincronizarlo con ./deps.ts
deno task update-lock

# Prepara husky en el proyecto
deno task prepare-husky

# Ejcuta la página de demostración en el puerto 8000
deno task demo
```

## Como Contribuir

- Primeo realizar un fork a este repositorio en el branch `main`.

- Antes de empezar a crear commits en el proyecto deberá ejecutar el siguiente comando (una única vez) para preparar husky, esto permitirá mantener el codigo siempre limpio antes de subir cambios.
```bash
deno task prepare-husky
```

- Agregue los cambios y cree sus commits.
```bash
git add .

# Para agregar una nueva característica, escriba:
git commit -m "feature: add new..."

# Para agregar una corrección, escriba:
git commit -m "fixmed: fix error in..."

git push origin main
```

- Por último deberá crear un PR al branch `dev`.


## Licencia

[MIT](https://github.com/EdixonAlberto/api-getonboard/blob/main/LICENSE) &copy; Edixon Piña
