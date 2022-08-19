import express from 'express'
import { Knex } from 'knex'

import VerifyUser from '@functions/verifyUser'

import { UserComments, PostComments, UsernameComments } from '@routes/comments/comments'
import CreateComment from '@routes/comments/createComment'
import DeleteComment from '@routes/comments/deleteComment'
import UpdateComment from '@routes/comments/updateComment'

const CommentsRouter = (connection: Knex) => {
    const router = express.Router()

    router.get('/:userid', VerifyUser, (req, res) => UserComments(req, res, connection))
    router.get('/id/:postid', VerifyUser, (req, res) => PostComments(req, res, connection))
    router.get('/username/:user', VerifyUser, (req, res) => UsernameComments(req, res, connection))

    router.post('/create', VerifyUser, (req, res) => CreateComment(req, res, connection))
    router.post('/delete', VerifyUser, (req, res) => DeleteComment(req, res, connection))
    router.post('/update', VerifyUser, (req, res) => UpdateComment(req, res, connection))

    return router
}

export default CommentsRouter
