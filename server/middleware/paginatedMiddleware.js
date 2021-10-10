import ProjectModel from "../models/projectModel.js";

async function paginatedResult(req, res, next) {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    const startIndex = (page - 1) * limit
    // const endIndex = (startIndex + limit) - 1

    try {
        const result = await ProjectModel.find().skip(startIndex).limit(limit).exec()
        res.results = result
        next()
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }

}

export default paginatedResult