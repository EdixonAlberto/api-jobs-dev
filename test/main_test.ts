import { superoak } from 'superoak'
import { ServerService } from '$/services/Server.service.ts'
import jobs from '$/data/jobs.json' assert { 'type': 'json' }

const server = new ServerService()

Deno.test('Get Jobs', async () => {
	const app = server.run()
	const request = await superoak(app)

	await request.get('/api/jobs').expect({
		total: jobs.length,
		jobs,
	})

	server.stop()
})
