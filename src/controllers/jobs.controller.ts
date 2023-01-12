import { Context } from '../deps.ts';
import jobs from '../data/jobs.json' assert { 'type': 'json' };

export function getJobs(ctx: Context): void {
	ctx.response.body = {
		total: jobs.length,
		jobs,
	};
}
