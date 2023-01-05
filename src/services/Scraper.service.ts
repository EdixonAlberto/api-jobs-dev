import { CheerioAPI, load } from '../deps.ts';

export class ScraperService {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	public async execute(path: string): Promise<CheerioAPI> {
		const pathname: string = path.startsWith('/') ? path : `/${path}`;
		const response = await fetch(this.baseUrl + pathname);
		const html: string = await response.text();
		const $ = load(html);
		return $;
	}
}
