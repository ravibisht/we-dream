import { StatusCodes } from "http-status-codes"
import HttpException from "./HttpException"

export default class InternalServerException extends HttpException {
    constructor(message) {
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        super(message, this.statusCode)
    }
}