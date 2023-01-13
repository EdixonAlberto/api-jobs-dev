import { Router } from '$deps';
import { getJobs } from '$src/controllers/jobs.controller.ts';

const router = new Router();

router.get('/jobs', getJobs);

export const routes = router.routes();
