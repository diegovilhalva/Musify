import { getRecentlyPlayed } from "../api/player.api.js"
import {getProfile} from "../api/user.api.js"
import { getDetail, getNewRelease } from "../api/album.api.js"
import { getAlbum } from "../api/artists.api.js"
import { LOW_LIMIT } from "../config/api.config.js"
import {msTimeCode} from '../helpers/helpers.utils.js'


export const album = async (req,res) => {
      // user profile
      const currentProfile = await getProfile(req)

      // recently played tracks
      const recentlyPlayed = await getRecentlyPlayed(req)
      const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)
        // get new releases
      const newRelease = await getNewRelease(req)

      res.render('./pages/album',{
        title:'Lançamentos',
        recentlyPlayedTracks,
        albums:newRelease,
        currentProfile
      })

}

export const albumDetail = async (req,res) => {
      // user profile
      const currentProfile = await getProfile(req)

      // recently played tracks
      const recentlyPlayed = await getRecentlyPlayed(req)
      const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

      // album detail

      const albumDetail = await getDetail(req)

      // more by artist

      const [firstArtist] = albumDetail.artists
      const moreByartist = await getAlbum(req,LOW_LIMIT,firstArtist.id)
      console.log(firstArtist)
   
      res.render('./pages/album_detail',{
        currentProfile,recentlyPlayedTracks,albumDetail,moreByartist:{firstArtist,...moreByartist},
        msTimeCode       
      })
}