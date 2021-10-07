import jwt from 'jsonwebtoken'
import adminAuthModel from '../models/adminAuthModel.js'

async function adminAuthMiddleware(req, res, next) {
    const token = req.cookies.portfolioToken

    //if not received token
    if (!token) {
        req.logedIn = false
        return next()
    }
    try {
        const tokenVarify = jwt.verify(token, process.env.SECRET_KEY)
        const admin = await adminAuthModel.findOne({ _id: tokenVarify.id, 'jwtTokens.jwt': token })

        //if token is not valid so admin is null
        if (!admin) {
            req.logedIn = false
            return next()
        }

        //here admin is valid
        req.logedIn = true
        next()

    } catch (error) {
        req.logedIn = false
        next()
    }


}
export default adminAuthMiddleware;