import { CheerioAPI, load } from '$deps';
import { ConfigService } from './Config.service.ts';

export class ScraperService {
	constructor(private readonly config = new ConfigService()) {}

	public async execute(path: string): Promise<CheerioAPI> {
		const baseUrl: string | undefined = this.config.get('URL_GETONBRD');
		if (!baseUrl) throw new Error('Evironment "URL_GETONBRD" not found');

		const pathname: string = path.startsWith('/') ? path : `/${path}`;
		const response = await fetch(baseUrl + pathname);
		const html: string = await response.text();
		const $ = load(html);
		return $;
	}
}
