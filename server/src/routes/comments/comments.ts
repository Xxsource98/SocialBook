import express from 'express'
import { Knex } from 'knex'

import { ConvertCommentsArray } from '@functions/comments'
import GetFriendsList from '@functions/friendsList'

const UserComments = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals

    const { userid } = req.params

    const friendsList = await GetFriendsList(userData.id, query)
    const areWeFriends = friendsList.indexOf(parseInt(userid)) !== -1

    if (areWeFriends) {
        const queryResult = await query
            .select(`*`)
            .from(`users_comments`)
            .where(`posterID`, userid)
            .then(async commentsData => {
                const comments = await ConvertCommentsArray(commentsData, query)

                return globalThis.ReturnData(200, comments)
            })
            .catch(err => {
                console.error(err)

                return globalThis.ReturnData(500, err)
            })

        globalThis.SendPromiseData(res, queryResult)
    } else {
        globalThis.SendData(res, 400, 'You are not a friends')
    }
}

const UsernameComments = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals

    const { user } = req.params

    const posterID = await query
        .select(`ID`)
        .where(`username`, user)
        .from(`users`)
        .then(userData => {
            return userData[0]?.ID
        })

    const friendsList = await GetFriendsList(userData.id, query)
    const areWeFriends = friendsList.indexOf(parseInt(posterID)) !== -1

    if (areWeFriends) {
        const queryResult = await query
            .select(`*`)
            .from(`users_comments`)
            .where(`posterID`, posterID)
            .then(async commentsData => {
                const comments = await ConvertCommentsArray(commentsData, query)

                return globalThis.ReturnData(200, comments)
            })
            .catch(err => {
                console.error(err)

                return globalThis.ReturnData(500, err)
            })

        globalThis.SendPromiseData(200, queryResult)
    } else {
        globalThis.SendData(res, 400, 'You are not a friends')
    }
}

const PostComments = async (req: express.Request, res: express.Response, query: Knex) => {
    const postID = req.params.postid

    const queryResult = await query
        .select(`*`)
        .from(`users_comments`)
        .where(`postID`, postID)
        .then(async commentsData => {
            const comments = await ConvertCommentsArray(commentsData, query)

            return globalThis.ReturnData(200, comments)
        })
        .catch(err => {
            console.error(err)

            return globalThis.ReturnData(500, err)
        })

    globalThis.SendPromiseData(res, queryResult)
}

export { UserComments, PostComments, UsernameComments }
