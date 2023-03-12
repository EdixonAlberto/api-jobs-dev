import { Cheerio, CheerioAPI, Element } from 'cheerio/types'
import { ConfigService } from '$/services/Config.service.ts'
import { ScraperService } from '$/services/Scraper.service.ts'
import type { IJob, TJobDetails, TJobPartial } from '$types'

const MODE_DEV = false

export async function scrapeJobs(): Promise<void> {
	const config = new ConfigService()
	const scraper = new ScraperService()
	await config.load()
	const baseUrl: string = config.get('URL_GETONBRD') || 'https://www.getonbrd.com'
	const $ = await scraper.execute(`${baseUrl}/empleos/programacion`)

	const sgbResultsList = $(
		'body #right-col .main-container ul.sgb-results-list>div',
	)
	const jobPartialList = getJobPartialList(sgbResultsList, $)
	const cheerioResponses = await Promise.allSettled(
		(MODE_DEV ? [jobPartialList[0]] : jobPartialList).map((job: TJobPartial) => scraper.execute(job.url)),
	)
	const jobs: IJob[] = []

	for (let i = 0; i < cheerioResponses.length; i++) {
		const cheerioResponse = cheerioResponses[i]

		if (cheerioResponse.status === 'fulfilled') {
			const jobPartial = jobPartialList[i]
			const $ = cheerioResponse.value
			const details = getJobDetails($)

			jobs.push({
				...jobPartial,
				details,
			})
		}
	}

	if (!MODE_DEV) Deno.writeTextFile('./src/data/jobs.json', JSON.stringify(jobs, null, 2))
}

function getJobPartialList(jobsResultList: Cheerio<Element>, $: CheerioAPI): TJobPartial[] {
	const jobs = $(jobsResultList).map((_i: number, el: Element) => {
		const elCheerio = $(el).children('a')

		const elInfo = elCheerio
			.children('.gb-results-list__main')
			.children('.gb-results-list__info')

		// const logo = elCheerio
		// 	.children('.gb-results-list__main')
		// 	.children('.gb-results-list__avatar')
		// 	.children('img.gb-results-list__img')
		// 	.attr('src');

		let title: string = elInfo
			.children('.gb-results-list__title')
			.children('strong')
			.text()

		// Remover caracteres especiales o emojis al inicio del título
		title = title.substring(title.search(/\w{1}/))

		const [role, time]: string[] = elInfo
			.children('.gb-results-list__title')
			.children('span')
			.text()
			.split('|')
			.map((t: string) => t.trim())

		const postulationFast: boolean = elInfo
			.children('.gb-results-list__title')
			.children('i')
			.hasClass('fa-bolt')

		const textInfo: string = elInfo
			.children('div')
			.text()

		const [companyName, ...locations]: string[] = textInfo
			.split('\n')
			.filter((t) => t)

		const location: string = locations
			.join(' ')
			.trim()
			.replace(/^\w{1}/, (l) => l.toUpperCase())

		const url: string = elCheerio.attr('href') || ''

		const perks: string[] = []
		elCheerio
			.children('.gb-results-list__secondary')
			.children('.gb-perks-list')
			.children('i')
			.each((_i, el) => {
				const elIcon = $(el)
				const className = elIcon.attr('class')!.split('perk-')[1]

				if (elIcon.hasClass(`perk-${className}`)) {
					perks.push(className.replaceAll('_', ' '))
				}
			})

		const elBadges = elCheerio
			.children('.gb-results-list__secondary')
			.children('.gb-results-list__badges')

		const isNew: boolean = elBadges
			.children('span')
			.hasClass('badge')

		const hasPublishedSalary: boolean = elBadges
			.children('i')
			.hasClass('fa-money')

		return {
			id: generateIdfromUrl(url),
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
		}
	}).toArray()

	return jobs
}

function getJobDetails($: CheerioAPI): TJobDetails {
	const rightCol = $('body #right-col')

	const isThemeColored = rightCol.children().hasClass('gb-company-theme-colored')
	const gbCompanyTheme = isThemeColored
		? rightCol.children('.gb-company-theme-colored')
		: rightCol.children('.gb-company-theme-clean')

	const postulationsText = gbCompanyTheme
		.children('.gb-landing-cover')
		.children('.gb-container')
		.children('.full-width')
		.children('.size0')
		.text()
		.match(/\d+/)

	const postulations = postulationsText ? Number(postulationsText[0]) : 0

	const gbContainer = rightCol
		.children('div.size1')
		.children('#job-body')
		.children('.gb-landing-section')
		.children('.gb-container')

	const remoteText = gbContainer
		.children('p.block')
		.text()
		.replaceAll('\n', '')

	const remote100 = [
		'El trabajo es permanentemente remoto desde cualquier ubicación del mundo.',
		'Candidates can reside anywhere in the world.',
	].includes(remoteText)

	const isOl = gbContainer
		.children('div:nth-child(3)')
		.children('.gb-rich-txt')
		.has('ol').text() !== ''

	const isUl = gbContainer
		.children('div:nth-child(3)')
		.children('.gb-rich-txt')
		.has('ul').text() !== ''

	const isList = isOl || isUl
	let language = 'spanish'
	let requestList: string[] = []

	if (isList) {
		const liList = isOl
			? gbContainer
				.children('div:nth-child(3)')
				.children('.gb-rich-txt')
				.children('ol')
				.children('li')
			: gbContainer
				.children('div:nth-child(3)')
				.children('.gb-rich-txt')
				.children('ul')
				.children('li')

		requestList = liList.map((_i, el) => $(el).text()).toArray()
	} else {
		const paragraphs = gbContainer
			.children('div:nth-child(3)')
			.children('.gb-rich-txt')
			.children('p')

		requestList = paragraphs.html()?.split('<br>') || [paragraphs.text()]
	}

	for (const request of requestList) {
		const hasEnglish: boolean = request.toLowerCase().search(/english|inglés/) > -1
		if (hasEnglish) {
			language = request
			break
		}
	}

	const gbTabsItemList = rightCol
		.children('.js-hide-fixed-actions')
		.children('.gb-container')
		.children('div:nth-child(3)')
		.children('.gb-tags')
		.children('.gb-tags__item')

	const skills = gbTabsItemList.map((_i, el) => $(el).text().replaceAll('\n', '')).toArray()

	return {
		postulations,
		remote100,
		language,
		skills,
	}
}

function generateIdfromUrl(url: string): string {
	const name = url.split('/').pop() as string
	const text = btoa(name)
	const id = text.substring(0, (text.length / 2) - 1)
	return id
}

scrapeJobs()
