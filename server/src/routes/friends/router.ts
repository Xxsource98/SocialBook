import express from 'express'
import { Knex } from 'knex'

import VerifyUser from '@functions/verifyUser'

import FriendsList, { AreWeFriends, UserFriendsList, UsernameFriendsList } from '@routes/friends/friendsList'
import AddFriend from '@routes/friends/addFriend'
import InviteAction, { CancelAction } from '@routes/friends/inviteAction'
import RemoveFriend from '@routes/friends/removeFriend'
import CurrentInvites from '@routes/friends/currentInvites'

const FriendsRouter = (connection: Knex) => {
    const router = express.Router()

    router.get('/', VerifyUser, (req, res) => FriendsList(req, res, connection))
    router.get('/user/:userid', VerifyUser, (req, res) => UserFriendsList(req, res, connection))
    router.get('/user/username/:user', VerifyUser, (req, res) => UsernameFriendsList(req, res, connection))
    router.get('/current_invites', VerifyUser, (req, res) => CurrentInvites(req, res, connection))
    router.get('/arefriends/:user', VerifyUser, (req, res) => AreWeFriends(req, res, connection))

    router.post('/cancel_invite', VerifyUser, (req, res) => CancelAction(req, res, connection))
    router.post('/add_friend', VerifyUser, (req, res) => AddFriend(req, res, connection))
    router.post('/accept_friend', VerifyUser, (req, res) => InviteAction('accept', req, res, connection))
    router.post('/deny_friend', VerifyUser, (req, res) => InviteAction('deny', req, res, connection))
    router.post('/remove_friend', VerifyUser, (req, res) => RemoveFriend(req, res, connection))

    return router
}

export default FriendsRouter
