import { superoak } from 'superoak'
import { ConfigService } from '$/services/Config.service.ts'
import { ServerService } from '$/services/Server.service.ts'
import jobs from '$/data/jobs.json' assert { 'type': 'json' }

const config = new ConfigService()
await config.load()
const server = new ServerService()

Deno.test('Get Jobs', async () => {
	const app = server.run()
	const request = await superoak(app)

	await request.get('/api/jobs').auth(config.get('ACCESS_TOKEN'), { type: 'bearer' }).expect({
		response: {
			data: jobs,
			total: jobs.length,
		},
		error: [],
	})

	server.stop()
})
