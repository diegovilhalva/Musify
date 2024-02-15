import { DEFAULT_LIMIT } from "../config/api.config.js"


export const generateRandomString = (length) => {
    let randomString = ''

    const possibleLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    
    for(let i = 0; i < length - 1;i++){
        const randomIndex = Math.floor(Math.random() * possibleLetters.length)
        randomString += possibleLetters[randomIndex]
    }

    return randomString
     
}

export const getUrlQuery = (params,limit = DEFAULT_LIMIT) => {
    const {page = 1} = params
    const offset  = (limit * page) - limit

    return {limit,offset,page}
}

export const msTimeCode = (ms) => {
    const sec = Math.floor((ms % 60000) / 1000)
    const min = Math.floor((ms % 3600000) / 60000)

    const formattedSec = sec.toString().padStart(2, '0')
    const formattedMin = min.toString().padStart(2, '0')

    return `${formattedMin}:${formattedSec}`
}
