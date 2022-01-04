import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is requred.'],
        maxlength: 100,
    },
    position: {
        type: String,
        required: [true, 'Job position is required.'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        required: [true, "Status can't be blank."],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true })

export default  mongoose.model('Job', JobSchema)