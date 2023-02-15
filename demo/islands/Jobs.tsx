import { useEffect, useState } from 'preact/hooks'
import Search from '$front/islands/Search.tsx'
import { IJob, TResponseAPI } from '$types'

export default function Jobs() {
	const [jobs, setJobs] = useState<IJob[]>([])

	useEffect(() => {
		getJobs()
	}, [])

	async function getJobs(): Promise<void> {
		const response = await fetch('http://localhost:4000/api/jobs', {
			headers: {
				'Authorization': 'Bearer 123',
			},
		})
		const data = await response.json() as TResponseAPI<{ total: number; data: IJob[] }>
		if (data.response) {
			const jobs = data.response.data.filter((job) => job.details.postulations < 10)
			setJobs(jobs)
		} else {
			// TODO: loading false
		}
	}

	return (
		<div class='jobs'>
			<div class='jobs__header'>
				<p>JobsDev es el destino número uno para buscar y listar increibles ofertas de trabajo remoto.</p>
				<Search />
				<h3 class='jobs__header__title'>Últimos Trabajos</h3>
			</div>

			<ul class='jobs__main__container'>
				{jobs.length
					? jobs.map((job: IJob) => (
						<li class='jobs__container__card'>
							<div class='jobs__card__title'>
								<span>{job.title}</span>
								{job.isNew && <span>Nuevo</span>}
							</div>

							<div class='jobs__card__content'>
								<div class='jobs__card__content__item'>
									<img class='jd__icon' src='/svgs/company.svg' alt='icon company' />
									<span>{job.companyName}</span>
								</div>

								<div class='jobs__card__content__item'>
									<img class='jd__icon' src='/svgs/location.svg' alt='icon location' />
									<span>{job.location}</span>
								</div>

								<a href={job.url} target='_blank' rel='noopener noreferrer'>Ver Detalles</a>
							</div>
						</li>
					))
					: <p>No hay trabajos publicados</p>}
			</ul>
		</div>
	)
}
