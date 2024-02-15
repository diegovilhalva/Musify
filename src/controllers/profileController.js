import { getRecentlyPlayed } from "../api/player.api.js"
import { getFollowedArtists, getProfile, getTopArtist, getTopTracks } from "../api/user.api.js"
import { LOW_LIMIT } from "../config/api.config.js"
import { msTimeCode } from "../helpers/helpers.utils.js"


export const profile = async (req,res) => {

      // user profile
      const currentProfile = await getProfile(req)

      // recently played tracks
      const recentlyPlayed = await getRecentlyPlayed(req)
      const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

      // current user top artist
      const userTopArtist = await getTopArtist(req,LOW_LIMIT)

      // current user top tracks
      const userTopTracks = await getTopTracks(req,6)

      // current user followed artists

      const userFollowedArtist = await getFollowedArtists(req)
      console.log(userTopArtist)
    
    res.render('./pages/profile',{
        currentProfile,
        recentlyPlayedTracks,
        userTopArtist,
        userTopTracks,
        userFollowedArtist,
        msTimeCode
    })
}

export const topArtist = async (req,res) => {
     // user profile
     const currentProfile = await getProfile(req)

     // recently played tracks
     const recentlyPlayed = await getRecentlyPlayed(req)
     const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

     // current user top artist
     const userTopArtist = await getTopArtist(req)

     res.render('./pages/user_top_artist',{
        currentProfile,
        recentlyPlayedTracks,
        artists:userTopArtist,
        title:'Seus artistas favoritos'
     })
}


export const topTrack = async (req,res) => {
     // user profile
     const currentProfile = await getProfile(req)

     // recently played tracks
     const recentlyPlayed = await getRecentlyPlayed(req)
     const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

      // current user top tracks
      const userTopTracks = await getTopTracks(req,50)
      res.render('./pages/user_top_tracks',{
        currentProfile,
        recentlyPlayedTracks,
        tracks:userTopTracks,
        title:'Suas músicas favoritas',
        msTimeCode
      })
}