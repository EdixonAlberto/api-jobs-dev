import { Application } from '../deps.ts';
import { routes } from '../routes/index.ts';
import { ConfigService } from './Config.service.ts';

export class Server {
	private readonly app = new Application();

	constructor(private readonly config = new ConfigService()) {
		this.middlewares();
		this.routes();
	}

	private middlewares() {
		// Asegurar que todas las peticiones empiecen por "/api"
		this.app.use(async (ctx, next) => {
			const path: string[] = ctx.request.url.pathname.split('/');
			if (path[1] === 'api') {
				ctx.request.url.pathname = `${path[0]}/${path[2]}`;
				await next();
			}
		});
	}

	private routes(): void {
		this.app.use(routes);
	}

	public run(): void {
		const hostname: string = this.config.get('HOST') || 'localhost';
		const port: number = Number(this.config.get('PORT')) || 8000;

		this.app.listen({ hostname, port });
		console.log(`Sever listening in: http://${hostname}:${port}`);
	}
}
