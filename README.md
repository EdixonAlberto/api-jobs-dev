# API Jobs Dev

![deno compatibility](https://shield.deno.dev/deno/1.31.2)

API Rest para buscar ofertas de trabajo remoto en proramación. Creado con Deno 🦕

**Aplicación web &#x279c;**  [https://jobs-dev-web.netlify.app/](https://jobs-dev-web.netlify.app/)

## Inicio

Para iniciar el proyecto debe escribir uno de los siguientes comandos.

```sh
# Inicia el servidor en modo desarrollo
deno task dev

# Inicia el servidor en modo producción
deno task start
```

Para cambiar la configuración por defecto debe crear un archivo `.env` en la raiz del proyecto, para esto compie la
plantilla incorporada y cambie las variables que desee.

```sh
cp .env.template .env
```

## Endpoints

| Método | Ruta      | Descripción                                      |
| ------ | --------- | ------------------------------------------------ |
| GET    | /api/jobs | Obtener todas las ofertas de trabajo             |
| GET    | /api/docs | Página de documentación de la api (Proximamente) |

Declaración de tipos de la respuesta entregada por el endpoint `GET: /api/jobs`

```ts
type TResponseList = {
  total: number
  data: TJob[]
}

type TJob = {
  title: string
  role: string
  time: string
  postulationFast: boolean
  companyName: string
  location: string
  url: string
  perks: string[]
  isNew: boolean
  hasPublishedSalary: boolean
  details: {
    postulations: number
    remote100: boolean
    language: string | 'spanish'
    skills: string[]
  }
}
```

## Base de Datos Temporal

Usando el comando `Deno task prepare:db` se crea una base de datos temporal en un archivo json ubicado en
[./src/data/](./src/data/) donde se almacenan todas las ofertas de trabajo recopiladas desde las siguientes fuentes:

- [x] Get On Board [https://www.getonbrd.com/](https://www.getonbrd.com/)

- [ ] LinkedIn [https://www.linkedin.com/](https://www.linkedin.com/)

## Lista de Comandos

```sh
# Prepara los datos e inicia el servidor en modo desarrollo
deno task dev

# Inicia el servidor en modo producción
deno task start

# Prepara los datos necesarios que consumirá la API
deno task prepare:db

# Actualiza deno.lock para sincronizarlo con ./deps.ts
deno task update:lock

# Prepara husky en el proyecto
deno task prepare:husky

# Ejcuta la página de demostración en el puerto 8000
deno task demo
```

## Como Contribuir

- Primeo realizar un fork a este repositorio en el branch `main`.

- Antes de empezar a crear commits en el proyecto deberá ejecutar el siguiente comando (una única vez) para preparar
  husky, esto permitirá mantener el codigo siempre limpio antes de subir cambios.

```sh
deno task prepare-husky
```

- Agregue los cambios y cree sus commits.

```sh
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
