import express from "express"
import { profile, topArtist, topTrack } from "../controllers/profileController.js"

const router = express.Router()


router.get('/',profile)

router.get(['/top/artist','/top/artist/page/:page'],topArtist)

router.get(['/top/track','/top/track/page/:page'],topTrack)

export default router