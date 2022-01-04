import mongoose from "mongoose"
import { emailPattern } from "../util/CommonRegex"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name.'],
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email Id.'],
        match: [emailPattern, 'Please Provide Valid Email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password.'],
        minLength: 6,
        maxLength: 100,

    }
})


UserSchema.methods.createToken = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.TOKEN_SECRET, { expiresIn: '30d' })
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
    return await bcrypt.compare(canditatePassword, this.password)
}

UserSchema.pre('save', async function () {
    const SALT = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, SALT)
})

export default mongoose.model('User', UserSchema)