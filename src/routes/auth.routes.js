import express from "express"
import { auth, callback } from "../controllers/authController.js"
import { refreshToken } from "../controllers/refreshTokenController.js"

const router = express.Router()

router.get('/',auth)

router.get("/callback",callback)

router.get('/refresh_token',refreshToken)
export default  router