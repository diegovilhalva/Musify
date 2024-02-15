import express from "express"
import { playlist, playlistDetail } from "../controllers/playlistController.js"

const router = express.Router()

router.get(['/','/page/:page'],playlist)

router.get('/:playlistId',playlistDetail)

export default router