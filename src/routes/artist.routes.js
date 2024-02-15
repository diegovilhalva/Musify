import express from "express"
import { artistAlbum, artistDetail } from "../controllers/artistController.js"

const router = express.Router()

router.get('/:artistId',artistDetail)

router.get(['/:artistId/album','/:artistId/album/page/:page'],artistAlbum)

export default router