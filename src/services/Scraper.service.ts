import { CheerioAPI, load } from '$deps'

export class ScraperService {
	public async execute(url: string): Promise<CheerioAPI> {
		const response = await fetch(url)
		const html: string = await response.text()
		const $ = load(html)
		return $
	}
}
