import { Router } from '$deps'
import { getJobs } from '$/controllers/jobs.controller.ts'
import { getDocs } from '$/controllers/docs.controller.ts'

const router = new Router()

router.get('/jobs', getJobs)
router.get('/docs', getDocs)

export const routes = router.routes()
