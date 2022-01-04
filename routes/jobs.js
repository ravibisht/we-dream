import express from 'express'
import { getAllJobs, getJob, createJob, updateJob, deleteJob } from '../controller/jobs'

const router = express.Router()


router.route('/').get(getAllJobs)
router.route('/').post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router
