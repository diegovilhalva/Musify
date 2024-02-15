import { getRefresToken } from "../api/refresh_token.api.js"


export const refreshToken = async (req,res) => {
    const milliseconds = 1000

    const response = await getRefresToken(req.cookies.refresh_token)

    if (response.status === 200) {
        const {access_token,expires_in} = response.data       
        res.cookie('access_token',access_token,{maxAge:expires_in * milliseconds})
        res.redirect(req.query.redirect)
    }else {
        res.redirect('/login')
    }
}