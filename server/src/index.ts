require('module-alias/register')

// Modules
import cors from 'cors'
import express from 'express'
import betterLogging from 'better-logging'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import busboy from 'connect-busboy'
import dotenv from 'dotenv'

// Routers
import UserRouter from '@routes/user/router'
import CommentsRouter from '@routes/comments/router'
import PostsRouter from '@routes/posts/router'
import FriendsRouter from '@routes/friends/router'

// Functions
import InitConnection from '@functions/database'
import InitGlobalFunctions from '@functions/returnData'

// Init Express with KNEX Connection and Better Logging
dotenv.config()
betterLogging(console)
const app = express()
const port = process.env.PORT || 1337
const connection = InitConnection()
InitGlobalFunctions()

// Init Modules
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use(busboy({ immediate: true }))
app.use(cors())
app.use(cookieParser())

// Public Folder
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))
app.use('/public', express.static(path.join(__dirname, '../public/')))

// Server Routes
app.use('/user', UserRouter(connection))
app.use('/posts', PostsRouter(connection))
app.use('/comments', CommentsRouter(connection))
app.use('/friends', FriendsRouter(connection))

app.listen(port, () => console.info(`Server is listening on: ${port}`))
