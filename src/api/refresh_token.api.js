import { token } from "../config/axios.config.js"


export const getRefresToken = async (refreshToken) => {
    try {
        const response = await token.post('/token',{
            grant_type : 'refresh_token',
            refresh_token:refreshToken
        })
        return response
    } catch (error) {
        console.log(error)
    }
}