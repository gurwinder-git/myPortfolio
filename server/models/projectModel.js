import mongoose from 'mongoose'


const projectSchema = new mongoose.Schema({
    pName: {
        type: String,
        trim: true,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    projectLink: {
        type: String,
        required: true,
        trim: true
    },
    projectDescription: {
        type: String,
        required: true,
        trim: true
    }
})