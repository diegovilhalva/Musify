import express  from "express"
import { explore, exploreDetail } from "../controllers/exploreController.js"

const router = express.Router()


router.get(['/','/page/:page'],explore)

router.get(['/:categoryId','/:categoryId/page/:page'],exploreDetail)



export default router