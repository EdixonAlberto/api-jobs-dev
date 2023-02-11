import { Context } from '$deps'
import jobs from '$src/data/jobs.json' assert { 'type': 'json' }
import { ResponseDto } from '$src/dto/Response.dto.ts'
import { IJob } from '$types'

export function getJobs(ctx: Context): void {
	const data = new ResponseDto(jobs as IJob[])
	ctx.response.body = data
}
