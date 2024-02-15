import { MARKET } from "../config/api.config.js"
import { getData } from "../config/axios.config.js"
import { getUrlQuery } from "../helpers/helpers.utils.js"


export const getSeveralDetail = async (req,artistsId) => {
    const {data:trackArtiists} = await getData(`/artists?ids=${artistsId}&locale=pt_BR`,req.cookies.access_token)
    return trackArtiists
}

export  const getAlbum = async (req,itemLimit,id) => {
    const {offset,limit,page} = getUrlQuery(req.params,itemLimit)

    const {artistId = id} = req.params

    const  {data:artistAlbum} = await getData(`/artists/${artistId}/albums?limit=${limit}&offset=${offset}`,req.cookies.access_token)

    const baseUrl = `${req.baseUrl}/${artistId}/album`

    return {baseUrl,page,...artistAlbum}
}

export const getDetail = async (req) => {
    const {artistId} = req.params

    const {data:artistDetail} =  await getData(`/artists/${artistId}`,req.cookies.access_token)

    return  artistDetail
}

export const getTopTracks = async (req,id) => {
    const {artistId = id} = req.params 
    const {data:artistTopTracks} = await getData(`/artists/${artistId}/top-tracks?market=${MARKET}
    `,req.cookies.access_token)

    return artistTopTracks
}

export const getReleatedArtists  = async (req,id) => {
    const {artistId = id} = req.params 

    const {data:artistRelatedArtist} = await getData(`/artists/${artistId}/related-artists
    `,req.cookies.access_token)

    return artistRelatedArtist

}