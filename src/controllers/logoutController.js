

export const logout = (req,res) => {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    res.redirect('/login')
}