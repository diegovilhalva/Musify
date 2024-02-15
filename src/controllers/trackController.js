import { getReleatedArtists, getSeveralDetail,getTopTracks } from "../api/artists.api.js"
import { getRecentlyPlayed } from "../api/player.api.js"
import { getDetail, getLyrics } from "../api/track.api.js"
import { getProfile } from "../api/user.api.js"
import { msTimeCode } from "../helpers/helpers.utils.js"



export const trackDetail = async (req,res) => {
      // user profile
      const currentProfile = await getProfile(req)

      // recently played tracks
      const recentlyPlayed = await getRecentlyPlayed(req)
      const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)

     //  track detail 
    const trackDetail = await getDetail(req)

      // track artist detail
      const artistIds  = trackDetail.artists.map(({id}) => id)
      const trackArtists = await getSeveralDetail(req,artistIds.join(','))

     // first artist top track
     const  [firstArtistId] = artistIds
     const artistTopTracks = await getTopTracks(req,firstArtistId)


     // related  Artist
     const relatedArtist = await getReleatedArtists(req,firstArtistId)

     // track lyrics

     const {name,artists,external_ids:{isrc}} = trackDetail

     const trackLyrics = await getLyrics(name,artists[0].name,isrc)




      res.render('./pages/track_detail',{
        currentProfile,
        recentlyPlayedTracks,
        trackArtists,
        artistTopTracks,
        relatedArtist,
        trackDetail,
        trackLyrics,
        msTimeCode
      })
}