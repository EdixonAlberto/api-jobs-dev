import type { IJob } from '$types'

export class ResponseDto {
	readonly jobs: IJob[]
	readonly total: number

	constructor(jobs: IJob[]) {
		this.jobs = jobs
		this.total = jobs.length
	}
}
