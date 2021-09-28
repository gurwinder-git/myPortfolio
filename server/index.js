import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import adminRoutes from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()

//connect DB
connectDB(process.env.MONGODB_URL)

const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
    exposedHeaders: ['Set-Cookie']
}))

//endpoints
app.use('/admin', adminRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))