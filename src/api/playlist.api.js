import { getData } from "../config/axios.config.js"
import { getUrlQuery } from "../helpers/helpers.utils.js"



export const getFeatured = async (req, itemLimit) => {
    const { offset, limit, page } = getUrlQuery(req.params,itemLimit)

    const { data: featuredPlaylist } = await getData(`/browse/featured-playlists?limit=${limit}&offset=${offset}&locale=pt_BR`, req.cookies.access_token)

    return { baseUrl: req.baseUrl, page, ... featuredPlaylist }
    
}


export const  getCategoryPlaylist = async (req,itemLimit) => {
    const {offset,limit,page} = getUrlQuery(req.params,itemLimit)
    const {categoryId = 'toplists' } = req.params

    const {data:catPlaylist} =  await getData(`/browse/categories/${categoryId}/playlists?limit=${limit}&offset=${offset}&locale=pt_BR`,req.cookies.access_token)

    const  baseUrl =  `${req.baseUrl}/${categoryId}`

    return {baseUrl,page, ... catPlaylist}
 }


 export const getDetail = async (req) => {
    const {playlistId} = req.params

    const {data:playlistDetail} = await getData(`/playlists/${playlistId}`,req.cookies.access_token)

    return playlistDetail 
 }