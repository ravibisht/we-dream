import jwt from "jsonwebtoken"
import { UnAuthroziedException } from "../exception"

export const authenticationMiddleWare = (req, res, next) => {
    const authToken = req.headers.authorization
    if (!authToken || !authToken.startsWith('Bearer')) { throw new UnAuthroziedException("Please Provide Token") }

    try {
        const token = authToken.split(' ')[1]
        const payLoad = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = { userId: payLoad.userId, name: payLoad.name }
        next()
    } catch (error) { throw new UnAuthroziedException("Authenication Failed") }

}

export default authenticationMiddleWare