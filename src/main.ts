import { Server } from './services/Server.service.ts';
import { LoadEnv } from './deps.ts';

try {
	await LoadEnv();
	const server = new Server();

	server.run();
} catch (error) {
	console.log((error as Error).message);
}
