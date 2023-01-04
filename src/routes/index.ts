import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { getJobs } from '../controllers/jobs.controller.ts';

const router = new Router();

router.get('/jobs', getJobs);

export const routes = router.routes();
