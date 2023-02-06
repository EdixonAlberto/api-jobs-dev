import { Application } from '$deps'
import { routes } from '$src/routes/index.ts'
import { ConfigService } from './Config.service.ts'

export class ServerService {
	constructor(
		private readonly config = new ConfigService(),
		private readonly app = new Application(),
		private readonly controller = new AbortController(),
	) {
		this.middlewares()
		this.routes()
	}

	private middlewares(): void {
		// Asegurar que todas las peticiones empiecen por "/api"
		this.app.use(async (ctx, next): Promise<void> => {
			const path: string[] = ctx.request.url.pathname.split('/')
			if (path[1] === 'api') {
				ctx.request.url.pathname = `${path[0]}/${path[2]}`
				await next()
			}
		})
	}

	private routes(): void {
		this.app.use(routes)
	}

	public run(): Application {
		const port: number = Number(this.config.get('PORT')) || 8000

		this.app.listen({ port, signal: this.controller.signal })
		console.log(`Server listening in: http://localhost:${port}`)

		return this.app
	}

	public stop(): void {
		this.controller.abort()
	}
}
