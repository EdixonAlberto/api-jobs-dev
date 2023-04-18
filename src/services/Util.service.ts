import { uuid } from '$deps'

export abstract class UtilService {
	public static async generateIdfromUrl(url: string): Promise<string> {
		const name = url.split('/').pop() as string
		const encoder = new TextEncoder()
		const NAME_SPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'

		const data = encoder.encode(name)
		const id = await uuid.generate(NAME_SPACE, data)
		return id
	}
}
