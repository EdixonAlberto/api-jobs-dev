import { Context } from '$deps';
import jobs from '$src/data/jobs.json' assert { 'type': 'json' };

export function getJobs(ctx: Context): void {
	ctx.response.body = {
		total: jobs.length,
		jobs,
	};
}
