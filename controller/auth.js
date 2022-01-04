import User from "../models/User"
import { StatusCodes } from 'http-status-codes'
import 'dotenv/config'
import { BadRequestException, UnAuthroziedException } from '../exception'
import 'express-async-errors'


const register = async (req, res) => {

    const user = await User.create({ ...req.body })

    res.status(StatusCodes.CREATED).json({
        user: { name: user.name },
        token: user.createToken()
    })
}


const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) { throw new BadRequestException("Please Provide Email Id and Password.") }

    const user = await User.findOne({ email })

    if (!user) { throw new UnAuthroziedException("Invalid Credentials.") }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) { throw new UnAuthroziedException("Invalid Credentials.") }

    const token = user.createToken()

    res.status(StatusCodes.OK).json({
        user: { username: user.name }, token
    })
}

export { register, login }