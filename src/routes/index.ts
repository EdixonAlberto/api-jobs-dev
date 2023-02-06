import { Router } from '$deps'
import { getJobs } from '$src/controllers/jobs.controller.ts'
import { getDocs } from '$src/controllers/docs.controller.ts'

const router = new Router()

router.get('/jobs', getJobs)
router.get('/docs', getDocs)

export const routes = router.routes()
