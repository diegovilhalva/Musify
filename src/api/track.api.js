import { getData, musixMatchApi } from "../config/axios.config.js"



export const  getRecomendedTrack = async (req,trackSeed,itemLimit) => {
    const {data:{tracks:recommendedTracks}} = await getData(`/recommendations?seed_tracks=${trackSeed}&limit=${itemLimit}&locale=pt_BR`,req.cookies.access_token)

    return recommendedTracks
}



export const getDetail = async (req) => {
    const {trackId} = req.params

    const {data:trackDetail} = await getData(`/tracks/${trackId}`,req.cookies.access_token)

    return trackDetail
}

export const getLyrics = async (trackName,artistName, isrc = null) => {
        const {message:{body:{lyrics}}} = await musixMatchApi(`matcher.lyrics.get?`,{
            q_track:trackName.toLowerCase(),
            q_artist:artistName.toLowerCase(),
            track_isrc:isrc
        })

        return lyrics
}