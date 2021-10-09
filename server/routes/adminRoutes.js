import express from "express";
import AdminAuthModel from "../models/adminAuthModel.js";
import ProjectModel from "../models/projectModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authenticate from '../middleware/authenticate.js'
import mongooseErrorHandler from 'mongoose'

const router = express.Router();

router.post('/loginAPI', async (req, res) => {
    const { adminId, password } = req.body

    if (!adminId || !password)
        return res.status(400).json({ error: "All fields are required" })
    try {
        const user = await AdminAuthModel.findOne({ adminId })
        if (!user)
            return res.status(400).json({ error: "Invalid credentials" })

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch)
            return res.status(400).json({ error: "Invalid credentials" })

        //Now every thing is validated, so generate jwt token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
        user.jwtTokens.push({ jwt: token })
        await user.save()

        //send responce with token
        res.status(200).cookie('portfolioToken', token, {
            expires: new Date(Date.now() + 2629800000),
            httpOnly: true
        }).json({ message: "logged In" })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error." })
    }
})

//utilliy api
router.get('/verify/authenticationAPI', authenticate, (req, res) => {
    if (req.loggedIn)
        res.status(200).json({ success: "Authorized" })
    else
        res.status(200).json({ error: "Not_authorized" })
})


router.get('/get/projectsAPI', authenticate, (req, res) => {
    if (req.loggedIn) {
        res.status(200).json({ projects: "p1" })
    }
    else {
        res.status(200).json({ error: "Not_authorized" })
    }
})

router.post('/add/projectAPI', authenticate, async (req, res) => {
    if (req.loggedIn) {
        try {
            const { title, link, description } = req.body
            // req.files
            const project = new ProjectModel({
                projectTitle: title,
                imagePath: 'setting soon',
                projectLink: link,
                projectDescription: description
            })

            const data = await project.save()

            res.status(200).json({ newProject: data })

        } catch (error) {
            console.log('catch admin Router=>', error.message)
            res.status(500).json({ error: "Internal server error" })
        }
    }
    else {
        res.status(200).json({ error: "Not_authorized" })
    }
})


export default router;
