import { DEFAULT_LIMIT } from "../config/api.config.js";
import { getData } from "../config/axios.config.js";


export const getRecentlyPlayed = async (req,itemLimit = DEFAULT_LIMIT) => {
    const {data:recentlyPlayed} = await getData(`/me/player/recently-played?limit=${itemLimit}`,req.cookies.access_token)

    return recentlyPlayed
}

