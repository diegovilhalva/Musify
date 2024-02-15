import express from "express"
import { album, albumDetail } from "../controllers/albumController.js"

const router = express.Router()

router.get(['/','/page/:page'],album)

router.get('/:albumId',albumDetail)




export default router