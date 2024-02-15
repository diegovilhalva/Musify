import { getDetail, getSeveralDetail } from "../api/category.api.js"
import { getRecentlyPlayed } from "../api/player.api.js"
import { getCategoryPlaylist } from "../api/playlist.api.js"
import { getProfile } from "../api/user.api.js"





export const explore = async (req,res) => {

     // user profile
     const currentProfile = await getProfile(req)

     // recently played tracks
     const recentlyPlayed = await getRecentlyPlayed(req)
     const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)
  
     const categories = await getSeveralDetail(req)
   

    res.render('./pages/explore',{
        currentProfile,
        recentlyPlayedTracks,
        categories
    })
}

export const exploreDetail = async (req,res) => {
      // user profile
      const currentProfile = await getProfile(req)

      // recently played tracks
      const recentlyPlayed = await getRecentlyPlayed(req)
      const recentlyPlayedTracks = recentlyPlayed.items.map(({track}) => track)   

     // get category detail

    const catInfo =  await  getDetail(req)

    // getcategy playlist
    const catPlaylist = await getCategoryPlaylist(req)


      res.render('./pages/explore_detail',{
        currentProfile,
        recentlyPlayedTracks,
        catInfo,
        catPlaylist
    })
}