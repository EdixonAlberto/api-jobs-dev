import { ConfigService } from './services/Config.service.ts';
import { Server } from './services/Server.service.ts';

try {
	const config = new ConfigService();
	const server = new Server();

	await config.load();
	server.run();
} catch (error) {
	console.log((error as Error).message);
}
