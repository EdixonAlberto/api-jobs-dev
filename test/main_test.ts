import { superoak } from '$deps'
import { ServerService } from '$src/services/Server.service.ts'
import jobs from '$src/data/jobs.json' assert { 'type': 'json' }

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
