import express from 'express'
import { Knex } from 'knex'

import VerifyUser from '@functions/verifyUser'

import { AllPosts, UserPosts, PostID, UsernamePosts } from '@routes/posts/posts'
import CreatePost from '@routes/posts/createPost'
import DeletePost from '@routes/posts/deletePost'
import UpdatePost from '@routes/posts/updatePost'
import LikePost from '@routes/posts/likePost'

const PostsRouter = (connection: Knex) => {
    const router = express.Router()

    router.get('/', VerifyUser, (req, res) => AllPosts(req, res, connection))
    router.get('/:userid', VerifyUser, (req, res) => UserPosts(req, res, connection))
    router.get('/username/:user', VerifyUser, (req, res) => UsernamePosts(req, res, connection))
    router.get('/id/:id', VerifyUser, (req, res) => PostID(req, res, connection))

    router.post('/create', VerifyUser, (req, res) => CreatePost(req, res, connection))
    router.post('/delete', VerifyUser, (req, res) => DeletePost(req, res, connection))
    router.post('/update', VerifyUser, (req, res) => UpdatePost(req, res, connection))
    router.post('/like', VerifyUser, (req, res) => LikePost(req, res, connection))

    return router
}

export default PostsRouter
