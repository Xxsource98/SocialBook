import express from 'express'
import { Knex } from 'knex'

import VerifyUser from '@functions/verifyUser'

import Validate from '@routes/user/validate'
import Login from '@routes/user/login'
import Register from '@routes/user/register'
import Delete from '@routes/user/delete'
import Update from '@routes/user/update'
import Info, { InfoUsername } from '@routes/user/info'
import { GetProfilePicture, SetProfilePicture } from '@routes/user/profilePicture'
import RefreshAT from '@routes/user//refreshAT'
import AllUsers from '@routes/user/allUsers'

const UserRouter = (connection: Knex) => {
    const router = express.Router()

    router.get('/info', VerifyUser, (req, res) => Info(req, res, connection))
    router.get('/info/:userid', VerifyUser, (req, res) => Info(req, res, connection))
    router.get('/info/username/:user', VerifyUser, (req, res) => InfoUsername(req, res, connection))
    router.get('/profile_picture/:userid', VerifyUser, (req, res) => GetProfilePicture(req, res, connection))
    router.get('/all_users', VerifyUser, (req, res) => AllUsers(req, res, connection))
    router.get('/all_users/:search', VerifyUser, (req, res) => AllUsers(req, res, connection))
    
    router.post('/refreshAT', VerifyUser, RefreshAT)
    router.post('/validate', VerifyUser, Validate)
    router.post('/login', (req, res) => Login(req, res, connection))
    router.post('/register', (req, res) => Register(req, res, connection))
    router.post('/delete', VerifyUser, (req, res) => Delete(req, res, connection))
    router.post('/update', VerifyUser, (req, res) => Update(req, res, connection))
    router.post('/update/profile_picture', VerifyUser, (req, res) => SetProfilePicture(req, res, connection))

    return router
}

export default UserRouter
