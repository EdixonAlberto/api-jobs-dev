import { ScraperService } from '../services/Scraper.service.ts';
import { Cheerio, CheerioAPI, Element } from '../deps.ts';

export async function scrapeJobs(): Promise<void> {
	const scraper = new ScraperService();
	const $ = await scraper.execute('/empleos/programacion');

	const jobsResultList = $(
		'body #right-col .main-container ul.sgb-results-list>div',
	);

	const jobs = getDataJobs(jobsResultList, $);

	Deno.writeTextFile('./src/data/jobs.json', JSON.stringify(jobs, null, 2));
}

const getDataJobs = (
	jobsResultList: Cheerio<Element>,
	$: CheerioAPI,
): TJob[] => {
	const jobs = $(jobsResultList).map((_i: number, el: Element) => {
		let elCheerio = $(el);
		elCheerio = elCheerio.children('a');

		const elInfo = elCheerio
			.children('.gb-results-list__main')
			.children('.gb-results-list__info');

		// const logo = elCheerio
		// 	.children('.gb-results-list__main')
		// 	.children('.gb-results-list__avatar')
		// 	.children('img.gb-results-list__img')
		// 	.attr('src');

		const title: string = elInfo
			.children('.gb-results-list__title')
			.children('strong')
			.text();

		const [role, time]: string[] = elInfo
			.children('.gb-results-list__title')
			.children('span')
			.text()
			.split('|')
			.map((t: string) => t.trim());

		const textInfo: string = elInfo
			.children('div')
			.text();

		const [companyName, ...locations]: string[] = textInfo
			.split('\n')
			.filter((t) => t);

		const location = locations
			.filter((_t, i) => i > 0)
			.join(' ');

		const url: string = elCheerio.attr('href') || '';

		return {
			title,
			role,
			time,
			companyName,
			location,
			url,
		};
	}).toArray();

	return jobs;
};

scrapeJobs();
