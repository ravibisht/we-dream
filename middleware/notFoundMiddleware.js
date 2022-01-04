import { StatusCodes } from "http-status-codes"
export default (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: 'Lost in Space.'
    })
}