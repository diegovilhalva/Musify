import { getData } from "../config/axios.config.js"
import { getUrlQuery } from "../helpers/helpers.utils.js"



export const getNewRelease = async (req,itemLimit) => {
    const {limit,offset,page} = getUrlQuery(req.params,itemLimit)

    const {data:{albums:newRelease}} = await getData(`/browse/new-releases?limit=${limit}&offset=${offset}&locale=pt_BR`,req.cookies.access_token)
    return {baseUrl:req.baseUrl,page,...newRelease}
}


export const getDetail = async (req) => {
    const {albumId} = req.params

    const {data:albumDetail} = await getData(`/albums/${albumId}`,req.cookies.access_token)
    return albumDetail
}