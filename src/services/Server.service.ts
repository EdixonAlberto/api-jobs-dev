import { Application, CORS } from '$deps'
import { routes } from '$/routes/index.ts'
import { ConfigService } from './Config.service.ts'
import { ResponseDto } from '../dto/Response.dto.ts'

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
		// Enable CORS
		this.app.use(CORS())

		// Custom CORS
		this.app.use(async (ctx, next) => {
			const { response: resp } = ctx
			const { headers } = ctx.request
			const origin = headers.get('origin')
			const whiteList: string[] = this.config.get('WHITE_LIST')?.split(',') || []

			if (!origin || whiteList.includes(origin)) {
				await next()
			} else {
				resp.status = 401
				return resp.body = new ResponseDto({
					response: null,
					error: ['Unauthorized, this origin not allowed'],
				})
			}
		})

		// Authorization
		this.app.use(async (ctx, next) => {
			const { response: resp } = ctx
			const { headers } = ctx.request
			const authorization = headers.get('authorization')

			if (!authorization) {
				resp.status = 401
				return resp.body = new ResponseDto({
					response: null,
					error: ['Unauthorized, header \'Authorization\' is required'],
				})
			}

			const headerToken = authorization?.split('Bearer ')[1]
			const accessToken = this.config.get('ACCESS_TOKEN')

			if (headerToken !== accessToken) {
				resp.status = 401
				return resp.body = new ResponseDto({
					response: null,
					error: ['Unauthorized, this token is invalid'],
				})
			}

			await next()
		})

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

	public run() {
		const port: number = Number.parseInt(this.config.get('PORT') || '4000')

		this.app.listen({ port, signal: this.controller.signal })
		console.log(`Server listening at http://localhost:${port}`)

		return this.app
	}

	public stop(): void {
		this.controller.abort()
	}
}
