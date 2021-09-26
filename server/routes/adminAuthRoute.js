import express from "express";
import AdminAuthModel from "../models/adminAuthModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post('/admin/loginAPI', async (req, res) => {
    const { adminId, password } = req.body

    if (!adminId || !password)
        return res.status(400).send("All fields are required")

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

export default router;
