import { getRecentlyPlayed } from "../api/player.api.js"
import { getAlbum, getAll, getArtist, getPlaylist, getTrack } from "../api/search.api.js"
import { getProfile } from "../api/user.api.js"
import { msTimeCode } from "../helpers/helpers.utils.js"


export const search = async (req,res) => {
    
    res.redirect(`/search/all/${req.body.query}`)
}

export const searchAll = async (req,res) => {

         // user profile
         const currentProfile = await getProfile(req)

         // recently played tracks
         const recentlyPlayed = await getRecentlyPlayed(req)
         const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)


         // search result
         const searchAll = await getAll(req)


         res.render('./pages/search',{
            currentProfile,
            recentlyPlayedTracks,
            searchAll,
            query:req.params.query,
            type:'all',
            msTimeCode
         })
    
   
}

export const searchAlbum = async (req,res) => {
      // user profile
      const currentProfile = await getProfile(req)

      // recently played tracks
      const recentlyPlayed = await getRecentlyPlayed(req)
      const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

      
      // search result
      const searchAlbum = await getAlbum(req)

     
      res.render('./pages/search_album',{
        currentProfile,
        recentlyPlayedTracks,
        searchAlbum,
        query:req.params.query,
        type:'albums',
     })

}

export const searchArtist = async (req,res) => {
    // user profile
    const currentProfile = await getProfile(req)

    // recently played tracks
    const recentlyPlayed = await getRecentlyPlayed(req)
    const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

    
    // search result
    const searchArtist = await getArtist(req)

    res.render('./pages/search_artist',{
        currentProfile,
        recentlyPlayedTracks,
        searchArtist,
        query:req.params.query,
        type:'artists'
    })
} 


export const searchPlaylist = async (req,res) => {
      // user profile
      const currentProfile = await getProfile(req)

      // recently played tracks
      const recentlyPlayed = await getRecentlyPlayed(req)
      const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)
  
      
      // search result
      const searchPlaylist = await getPlaylist(req)

      res.render('./pages/search_playlist',{
        currentProfile,
        recentlyPlayedTracks,
        searchPlaylist,
        query:req.params.query,
        type:'playlists'
    })

}

export const searchTrack = async (req,res) => {
    // user profile
    const currentProfile = await getProfile(req)

    // recently played tracks
    const recentlyPlayed = await getRecentlyPlayed(req)
    const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

    
    // search result
    const searchTrack = await getTrack(req,50)
    
    res.render('./pages/search_track',{
        currentProfile,
        recentlyPlayedTracks,
        searchTrack,
        query:req.params.query,
        type:'tracks',
        msTimeCode
    })
}