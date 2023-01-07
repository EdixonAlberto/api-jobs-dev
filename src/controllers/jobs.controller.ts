import { Context } from '../deps.ts';
import jobs from '../data/jobs.json' assert { 'type': 'json' };

export function getJobs(ctx: Context) {
	ctx.response.body = {
		jobs,
	};
}
