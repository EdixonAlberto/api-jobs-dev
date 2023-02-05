import { ConfigService } from './services/Config.service.ts'
import { ServerService } from './services/Server.service.ts'

try {
	const config = new ConfigService()
	const server = new ServerService()

	await config.load()
	server.run()
} catch (error) {
	console.log((error as Error).message)
}
