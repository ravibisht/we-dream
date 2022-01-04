import { StatusCodes } from "http-status-codes"
import HttpException from "./HttpException"

export default class BadRequestException extends HttpException {
    constructor(message) {
        super(message, StatusCodes.BAD_REQUEST)
    }
}