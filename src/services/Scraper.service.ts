import { CheerioAPI, load } from '../deps.ts';

export class ScraperService {
	public async execute(path: string): Promise<CheerioAPI> {
		const baseUrl: string | undefined = Deno.env.get('URL_GETONBRD');
		if (!baseUrl) throw new Error('Evironment "URL_GETONBRD" not found');

		const pathname: string = path.startsWith('/') ? path : `/${path}`;
		const response = await fetch(baseUrl + pathname);
		const html: string = await response.text();
		const $ = load(html);
		return $;
	}
}
