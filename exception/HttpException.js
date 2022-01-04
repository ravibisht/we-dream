import { StatusCodes } from "http-status-codes";

export default class HttpException extends Error {
    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }
}