import { StatusCodes } from "http-status-codes"
import { BadRequestException, NotFoundException } from "../exception"
import Jobs from "../models/Jobs"

const getAllJobs = async (req, res) => {
    const jobs = await Jobs.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({
        data: jobs,
        count: jobs.length
    })
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Jobs.findOne({ _id: jobId, createdBy: userId })

    console.log("#Check Point 1");
    console.log(job);
    if (!job) { throw new NotFoundException(`Job not found with id : ${jobId}`) }


    res.status(StatusCodes.OK).json({
        data: job
    })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const createJob = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({ createJob })
}

const updateJob = async (req, res) => {

    const { user: { userId }, params: { id: jobId } } = req
    const { company, position } = req.body

    if (company === '' || position === '') throw new BadRequestException('Company or Position field can\'t be empty.')

    const job = await Jobs.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
        new: true,
        runValidators: true
    })

    if (!job) throw new NotFoundException(`Job not found with id : ${jobId}`)

    res.status(StatusCodes.OK).json({
        data: job
    })
}

const deleteJob = async (req, res) => {

    const { user: { userId }, params: { id: jobId } } = req

    const job = await Jobs.findOneAndRemove({ _id: jobId, createdBy: userId })

    if (!job) throw new NotFoundException(`Job not found with id : ${jobId}`)

    res.status(StatusCodes.OK).json({
        message: "Deleted Successfully."
    })
}



export { getAllJobs, getJob, createJob, updateJob, deleteJob }