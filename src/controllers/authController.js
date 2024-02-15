import querystring from "querystring"

import { CLIENT_ID, REDIRECT_URI, SCOPE, STATE_KEY } from "../config/api.config.js"
import {generateRandomString} from "../helpers/helpers.utils.js"
import { getToken } from "../api/auth.api.js"

export  const auth = (req, res) => {
    const state = generateRandomString(16)
    res.cookie(STATE_KEY, state)
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        state
    }))
}

export const callback = async (req,res) => {
    const milleseconds = 1000
    const  one_week = 604800000

    const  {code = null,state = null,error = null} = req.query

    const storedState = req.cookies[STATE_KEY]
    if(error || !state  || state !== storedState) {
       return  res.redirect('/login')
    }else{
        res.clearCookie(STATE_KEY)
        const response = await getToken(code)
        if(response.status == 200) {
            const  {access_token,refresh_token,expires_in} = response.data
            res.cookie('access_token',access_token,{
                maxAge: expires_in * milleseconds
            })
            res.cookie('refresh_token',refresh_token,{
                maxAge: one_week
            })            
            res.redirect('/')
        }else{
            res.redirect('/login')
        }
    }

}