import { Server } from './services/Server.service.ts';

try {
	const server = new Server();

	server.run();
} catch (error) {
	console.log((error as Error).message);
}
