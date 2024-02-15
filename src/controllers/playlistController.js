import { getRecentlyPlayed } from "../api/player.api.js"
import { getDetail, getFeatured } from "../api/playlist.api.js"
import { getProfile } from "../api/user.api.js"
import { LOW_LIMIT } from "../config/api.config.js"
import { msTimeCode } from "../helpers/helpers.utils.js"



export const playlist = async (req,res) => {
     // user profile
     const currentProfile = await getProfile(req)

     // recently played tracks
     const recentlyPlayed = await getRecentlyPlayed(req)
     const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)


     // featured playlist
     const featuredPlaylist = await getFeatured(req,LOW_LIMIT)
      
     res.render('./pages/playlist',{
        currentProfile,
        recentlyPlayedTracks,
        featuredPlaylist
     })
} 

export const playlistDetail = async (req,res) => {
       // user profile
       const currentProfile = await getProfile(req)

       // recently played tracks
       const recentlyPlayed = await getRecentlyPlayed(req)
       const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

      //get playlist detail

      const playlistDetail = await getDetail(req)

  

       res.render('./pages/playlist_detail',{
         currentProfile,
         recentlyPlayedTracks,
         msTimeCode,
         playlistDetail
       })
}