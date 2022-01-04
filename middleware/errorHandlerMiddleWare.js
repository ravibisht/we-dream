import { StatusCodes } from "http-status-codes"
import { HttpException } from "../exception"

export const errorHandlerMiddleWare = (err, req, res, next) => {
    if (err instanceof HttpException) {
        return res.status(err.statusCode).json({ message: err.message })
    }

    return res.status(301).json({ message: err })
}

export default errorHandlerMiddleWare 