
import cors from "cors"
import cookieParser from "cookie-parser"
import loginRoutes from "./src/routes/login.routes.js"
import authRoutes from "./src/routes/auth.routes.js"
import homeRoutes from "./src/routes/home.routes.js"
import exploreRoutes from "./src/routes/explore.routes.js"
import albumRoutes from "./src/routes/album.routes.js"
import playlistRoutes from "./src/routes/playlist.routes.js"
import profileRoutes from "./src/routes/profile.routes.js"
import searchRoutes from "./src/routes/search.routes.js"
import artistRoutes from "./src/routes/artist.routes.js"
import  trackRoutes from "./src/routes/track.routes.js"
import logoutRoutes from "./src/routes/logout.routes.js"
// Express config
import express from "express"
import { authenticatedUser } from "./src/middlewares/auth.user_middleware.js"
const app = express()



app.use(cors()).use(cookieParser())
app.use(express.json())

// encode request body

app.use(express.urlencoded({extended:true}))

// Ejs config
app.set("view engine","ejs")

app.use(express.static(`./public`))

// Routes Config
app.use("/login",loginRoutes)

app.use("/auth",authRoutes)

app.use(authenticatedUser)

app.use("/",homeRoutes)

app.use('/logout',logoutRoutes)

app.use('/explore',exploreRoutes)

app.use('/album',albumRoutes)

app.use('/playlist',playlistRoutes)

app.use('/me',profileRoutes)

app.use('/search',searchRoutes)

app.use('/artist',artistRoutes)

app.use('/track',trackRoutes)

// 404 page 

app.use((req,res) => {
    res.render('./pages/404')
})

app.listen(3000,() => {
    console.log(`Servidor rodando na porta 3000`)
})