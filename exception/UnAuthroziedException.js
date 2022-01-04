import { StatusCodes } from "http-status-codes"
import { HttpException } from "../exception"
export class UnAuthroziedException extends HttpException {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED)
    }
}