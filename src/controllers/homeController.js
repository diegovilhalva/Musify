import { getNewRelease } from "../api/album.api.js"
import { getSeveralDetail } from "../api/artists.api.js"
import { getRecentlyPlayed } from "../api/player.api.js"
import { getCategoryPlaylist, getFeatured } from "../api/playlist.api.js"
import { getRecomendedTrack } from "../api/track.api.js"
import { getProfile } from "../api/user.api.js"
import { LOW_LIMIT } from "../config/api.config.js"


export const home = async (req,res) => {
    // user profile
    const currentProfile = await getProfile(req)

    // recently played tracks
    const recentlyPlayed = await getRecentlyPlayed(req)
    const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)
 
    // recommended albuns
    const trackIds  = recentlyPlayedTracks.map(({id}) => id)
    const trackSeeds = trackIds.slice(0,5).join(',')
    const recommendedAlbuns = await getRecomendedTrack(req,trackSeeds,LOW_LIMIT)
    
    // recommended artists
    const artistEntries =  recommendedAlbuns.map(track => track.artists.map(artist => artist.id))
    const uniqueArtistsIds = [... new Set(artistEntries.flat(1))].join(',')
    const recommendedArtists = await getSeveralDetail(req,uniqueArtistsIds)

    // New release albums

    const newRelease = await getNewRelease(req,LOW_LIMIT)
   
    // Featured Playlists
    const featuredPlaylist = await getFeatured(req,LOW_LIMIT)

    // Top playlists

    const topPlaylist = await getCategoryPlaylist(req,LOW_LIMIT)
 
    res.render('./pages/home',{currentProfile,recommendedAlbuns,recommendedArtists,newRelease,featuredPlaylist,topPlaylist,recentlyPlayedTracks})
}

