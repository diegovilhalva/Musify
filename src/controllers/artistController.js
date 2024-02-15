import { getAlbum, getDetail, getReleatedArtists, getTopTracks } from "../api/artists.api.js"
import { getRecentlyPlayed } from "../api/player.api.js"
import { getProfile } from "../api/user.api.js"
import { LOW_LIMIT } from "../config/api.config.js"
import {msTimeCode} from '../helpers/helpers.utils.js'


export const artistDetail = async (req,res) => {
    // user profile
    const currentProfile = await getProfile(req)

    // recently played tracks
    const recentlyPlayed = await getRecentlyPlayed(req)
    const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

    // artist albums

    const artistAlbum = await getAlbum(req,LOW_LIMIT)

    // artist detail
    const artistDetail = await getDetail(req)

    // artist top tracks
    const artistTopTracks = await getTopTracks(req)
    //artist related artist

    const artistRelatedArtists = await getReleatedArtists(req)

    res.render('./pages/artist_detail',{
        currentProfile,
        recentlyPlayedTracks,
        artistAlbum,
        artistDetail,
        artistTopTracks,
        artistRelatedArtists,
        msTimeCode
        
    })
}

export const artistAlbum = async (req,res) => {
      // user profile
      const currentProfile = await getProfile(req)

      // recently played tracks
      const recentlyPlayed = await getRecentlyPlayed(req)
      const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)
  
      // artist albums
  
      const artistAlbum = await getAlbum(req)
  
      // artist detail   
      const artistDetail = await getDetail(req)

      res.render('./pages/album',{
        currentProfile,
        recentlyPlayedTracks,
        title:artistDetail.name,
        albums:artistAlbum,
        isArtistAlbum:true
      })
}