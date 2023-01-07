import { Context } from "../deps.ts";
import jsonJobs from "../data/jobs.json" assert { "type": "json" };

export function getJobs(ctx: Context) {
  ctx.response.body = {
    jsonJobs,
  };
}
