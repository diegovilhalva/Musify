import express from "express"
import { search, searchAlbum, searchAll, searchArtist, searchPlaylist, searchTrack } from "../controllers/searchController.js"

const router = express.Router()

router.post('/',search)

router.get('/all/:query',searchAll)

router.get(['/albums/:query','/albums/:query/page/:page'],searchAlbum)

router.get(['/artists/:query','/artists/:query/page/:page'],searchArtist)

router.get(['/playlists/:query','/playlists/:query/page/:page'],searchPlaylist)

router.get(['/tracks/:query','/tracks/:query/page/:page'],searchTrack)


export default router