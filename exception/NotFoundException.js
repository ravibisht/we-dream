import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException"

export default class NotFoundMiddleware extends HttpException {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND)
    }
}