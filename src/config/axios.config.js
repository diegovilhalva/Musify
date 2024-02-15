import axios from "axios";
import querystring from "querystring"
import { BASE_URL, CLIENT_ID, CLIENT_SECRET, MUSIXMATCH_API_KEY, MUSIXMATCH_BASE_URL, TOKEN_BASE_URL } from "./api.config.js";


export const token = axios.create({
    baseURL:TOKEN_BASE_URL,
    headers:{
        'Authorization':`Basic ${(Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))}`,
        'Content-Type':'application/x-www-form-urlencoded'
    }
})

const api = axios.create({baseURL:BASE_URL})

export const getData =  async (apiUrl,access_token) => {
    try {
        const response = await api.get(apiUrl,{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

const musixMatch = axios.create({baseURL:MUSIXMATCH_BASE_URL})

export const musixMatchApi = async (endpoint,parameters) => {
    try {
        const apiUrl =  `${endpoint}${querystring.stringify(parameters)}&apikey=${MUSIXMATCH_API_KEY}`

        const response  = await musixMatch.get(apiUrl)

        return response.data
    } catch (error) {
        console.log(error)
    }
}