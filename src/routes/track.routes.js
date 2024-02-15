import express from "express"
import { trackDetail } from "../controllers/trackController.js"

const router = express.Router()


router.get('/:trackId',trackDetail)

export default router