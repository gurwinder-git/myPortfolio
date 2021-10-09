import jwt from 'jsonwebtoken'
import adminAuthModel from '../models/adminAuthModel.js'

async function adminAuthMiddleware(req, res, next) {
    const token = req.cookies.portfolioToken

    //if not received token
    if (!token) {
        req.loggedIn = false
        return next()
    }
    try {
        const tokenVarify = jwt.verify(token, process.env.SECRET_KEY)
        const admin = await adminAuthModel.findOne({ _id: tokenVarify.id, 'jwtTokens.jwt': token })

        //if token is not valid so admin is null
        if (!admin) {
            req.loggedIn = false
            return next()
        }

        //here admin is valid
        req.loggedIn = true
        next()

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log(error.message)
        // req.loggedIn = false
        // next()
    }


}
export default adminAuthMiddleware;