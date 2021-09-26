import mongoose from 'mongoose'

const adminAuthSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    jwtTokens: [
        {
            jwt: {
                type: String,
                required: true
            }
        }
    ]
})


const AdminAuthModel = mongoose.model('admin', adminAuthSchema)


export default AdminAuthModel
