import mongoose from 'mongoose'


const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                return value.trim(' ').length >= 5
            },
            message: "title must contain 5 letters"
        }
    },
    imagePath: {
        type: String,
        required: true,
    },
    projectLink: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
                const regex = new RegExp(expression)

                return value.match(regex)
            },
            message: "Invalid URL"
        }
    },
    projectDescription: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return value.trim(' ').length >= 10
            },
            message: "Descreption must contain atleast 10 letters"
        }
    }
})

const ProjectModel = mongoose.model('project', projectSchema)

export default ProjectModel;