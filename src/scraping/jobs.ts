import { Cheerio, CheerioAPI, Element } from '../deps.ts';
import { ConfigService } from '../services/Config.service.ts';
import { ScraperService } from '../services/Scraper.service.ts';

export async function scrapeJobs(): Promise<void> {
	const config = new ConfigService();
	const scraper = new ScraperService();

	await config.load();
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
	const jobs = $(jobsResultList)
		.map((_i: number, el: Element) => {
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

			const postulationFast: boolean = elInfo
				.children('.gb-results-list__title')
				.children('i')
				.hasClass('fa-bolt');

			const textInfo: string = elInfo
				.children('div')
				.text();

			const [companyName, ...locations]: string[] = textInfo
				.split('\n')
				.filter((t) => t);

			const location: string = locations
				.join(' ')
				.trim()
				.replace(/^\w{1}/, (l) => l.toUpperCase());

			const url: string = elCheerio.attr('href') || '';

			const perks: string[] = [];
			elCheerio
				.children('.gb-results-list__secondary')
				.children('.gb-perks-list')
				.children('i')
				.each((_i, el) => {
					const elIcon = $(el);
					const className = elIcon.attr('class')!.split('perk-')[1];

					if (elIcon.hasClass(`perk-${className}`)) {
						perks.push(className.replaceAll('_', ' '));
					}
				});

			const elBadges = elCheerio
				.children('.gb-results-list__secondary')
				.children('.gb-results-list__badges');

			const isNew: boolean = elBadges
				.children('span')
				.hasClass('badge');

			const hasPublishedSalary: boolean = elBadges
				.children('i')
				.hasClass('fa-money');

			return {
				title,
				role,
				time,
				postulationFast,
				companyName,
				location,
				url,
				perks,
				isNew,
				hasPublishedSalary,
			};
		}).toArray();

	return jobs;
};

scrapeJobs();
