import dotenv from "dotenv"
dotenv.config()

// API BASE ADDRESS
export const BASE_URL = 'https://api.spotify.com/v1';


export const TOKEN_BASE_URL = 'https://accounts.spotify.com/api'

// SPOTIFY CLIENT ID

export const CLIENT_ID = process.env.CLIENT_ID

// SPOTIFY CLIENT SECRET

export const  CLIENT_SECRET = process.env.CLIENT_SECRET

// Redirect uri 

export const REDIRECT_URI = process.env.REDIRECT_URI

// Scope of spotify api request

export const SCOPE = process.env.SCOPE

// Authentication state key

export const STATE_KEY = 'spotify_auth'

// API request queries 

export const MARKET = 'BR'
export const LOW_LIMIT = 12
export const DEFAULT_LIMIT = 28

// musixmatch  base url 
export const MUSIXMATCH_BASE_URL = 'https://api.musixmatch.com/ws/1.1/'
// musixmatch api key   
export const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY




