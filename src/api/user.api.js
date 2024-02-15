
import {getData} from "../config/axios.config.js"
import { getUrlQuery } from "../helpers/helpers.utils.js"


export const getProfile = async (req) => {
    const {data:currentProfile} =  await getData('/me',req.cookies.access_token)

    return currentProfile
}

export const  getTopArtist = async (req,itemLimit) => {
    const {limit,offset,page} = getUrlQuery(req.params,itemLimit)

    const {data:topArtist} = await getData(`/me/top/artists?limit=${limit}&offset=${offset}`,req.cookies.access_token)

    const baseUrl = `${req.baseUrl}/top/artist`
    return  {baseUrl,page,...topArtist}
}

export const  getTopTracks =  async (req,itemLimit) => {
    const {limit,offset,page} =  getUrlQuery(req.params,itemLimit)

    const {data:topTracks} = await getData(`/me/top/tracks?limit=${limit}&offset=${offset}`,req.cookies.access_token)

    const baseUrl = `${req.baseUrl}/top/artist`
    return  {baseUrl,page,...topTracks}
}

export const getFollowedArtists = async (req) => {
    const {data:{artists:followedArtist}} = await getData(`/me/following?type=artist`,req.cookies.access_token)

    return followedArtist
}