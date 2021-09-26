import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import router from './routes/adminAuthRoute.js'
import adminAuthModel from './models/adminAuthModel.js'

dotenv.config()

const app = express()

//connect DB
connectDB(process.env.MONGODB_URL)

const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json());

//endpoints
app.use('/', router);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))