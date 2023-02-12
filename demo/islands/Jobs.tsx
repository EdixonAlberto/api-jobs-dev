import { useEffect, useState } from 'preact/hooks'
import { IJob, TResponseAPI } from '$types'

export default function Jobs() {
	const [jobs, setJobs] = useState<IJob[]>([])

	useEffect(() => {
		getJobs()
	}, [])

	async function getJobs(): Promise<void> {
		const response = await fetch('http://localhost:4000/api/jobs')
		const data = await response.json() as TResponseAPI
		const jobs = data.jobs
		setJobs(jobs)
	}

	return (
		<div class='jobs'>
			<h3 class='jobs__title'>Últimos Trabajos</h3>

			<ul class='jobs__container'>
				{jobs.length
					? jobs.map((job: IJob) => (
						<li class='jobs__card'>
							<div class='jobs__card__title'>
								<span>{job.title}</span>
								{job.isNew && <span>Nuevo</span>}
							</div>

							<div class='jobs__card__content'>
								<div class='jobs__card__content__item'>
									<img class='icon' src='/svgs/company.svg' alt='icon company' />
									<span>{job.companyName}</span>
								</div>

								<div class='jobs__card__content__item'>
									<img class='icon' src='/svgs/location.svg' alt='icon company' />
									<span>{job.location}</span>
								</div>
							</div>
						</li>
					))
					: <p>No hay trabajos publicados</p>}
			</ul>

			<div class='jobs__modal'>
				<div class='modal__card'>
					<div class='modal__title'>
					</div>

					<div class='details'></div>
				</div>
			</div>
		</div>
	)
}
