import { Router } from '../deps.ts';
import { getJobs } from '../controllers/jobs.controller.ts';

const router = new Router();

router.get('/jobs', getJobs);

export const routes = router.routes();
