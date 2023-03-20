import express from "express"
import authRoutes from "./auth/index.js"

const router = express.Router()

router.use(authRoutes)
router.use((res, req, next) => {
    next({
        message: "Requested resource not found",
        status: 404
    })
})
export default router