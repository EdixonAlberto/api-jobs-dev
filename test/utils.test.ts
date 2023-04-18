import { assert, uuid } from '$deps'
import { UtilService } from '$/services/Util.service.ts'

Deno.test('Generate UUID', async () => {
	const id = await UtilService.generateIdfromUrl(
		'https://www.getonbrd.com/jobs/programming/back-end-developer-c-leniolabs_-remote',
	)
	assert(uuid.validate(id))
})
