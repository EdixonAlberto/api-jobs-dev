import { Context } from '$deps'
import jobs from '$/data/jobs.json' assert { 'type': 'json' }
import { DataListDto, ResponseDto } from '$DTOs'
import { IJob } from '$types'

export function getJobs(ctx: Context) {
	const { response: resp } = ctx
	const data = new DataListDto<IJob>(jobs as IJob[])

	resp.status = 200
	return resp.body = new ResponseDto({
		response: data,
	})
}
