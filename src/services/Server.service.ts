import { Application } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { routes } from '../routes/index.ts';

export class Server {
	private readonly app = new Application();

	constructor() {
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
		const port = 8000;
		this.app.listen({ hostname: '0.0.0.0', port });
		console.log(`Sever listening on port ${port}`);
	}
}
