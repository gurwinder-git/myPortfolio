import mongoose from 'mongoose'

async function connectDB(url) {

    try {
        const result = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        if (result) {
            console.log('Database connected...')
        }
    } catch (error) {
        console.log(error.message)
    }

}

export default connectDB
