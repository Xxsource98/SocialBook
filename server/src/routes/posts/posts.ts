import express from 'express'
import { Knex } from 'knex'

import GetFriendsList from '@functions/friendsList'
import ConvertPosts, { GetFriendsRawSQL } from '@functions/posts'

const AllPosts = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals

    const friendsList = await GetFriendsList(userData.id, query, true)
    const sql = await GetFriendsRawSQL(friendsList)

    const queryResult = await query
        .raw(sql)
        .then(async postsData => {
            const posts = await ConvertPosts(postsData[0], query)

            return globalThis.ReturnData(200, posts)
        })
        .catch(err => {
            console.error(err)

            return globalThis.ReturnData(500, err)
        })

    globalThis.SendPromiseData(res, queryResult)
}

const UserPosts = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals

    const poster = req.params.userid

    if (userData) {
        const queryResult = await query
            .select(`*`)
            .from(`users_posts`)
            .where(`posterID`, poster)
            .then(async postsData => {
                const posts = await ConvertPosts(postsData, query)

                return globalThis.ReturnData(200, posts)
            })
            .catch(err => {
                console.error(err)

                return globalThis.ReturnData(500, err)
            })

        globalThis.SendPromiseData(res, queryResult)
    } else {
        globalThis.SendData(res, 500)
    }
}

const PostID = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals

    const posterID = req.params.id

    const queryResult = await query
        .select(`*`)
        .from(`users_posts`)
        .where(`ID`, posterID)
        .then(async postsData => {
            const friendsList = await GetFriendsList(userData.id, query, true)
            const areWeFriends = friendsList.indexOf(postsData[0].posterID) !== -1

            if (areWeFriends) {
                const posts = await ConvertPosts(postsData, query)

                return globalThis.ReturnData(200, posts)
            } else {
                return globalThis.ReturnData(400, 'You are not a friends')
            }
        })
        .catch(err => {
            console.error(err)

            return globalThis.ReturnData(500, err)
        })

    globalThis.SendPromiseData(res, queryResult)
}

const UsernamePosts = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals

    const { user } = req.params

    if (userData) {
        const posterID = await query
            .select(`ID`)
            .where(`username`, user)
            .from(`users`)
            .then(userData => {
                return userData[0]?.ID
            })

        if (posterID) {
            const queryResult = await query
                .select(`*`)
                .from(`users_posts`)
                .where(`posterID`, posterID)
                .then(async postsData => {
                    const posts = await ConvertPosts(postsData, query)

                    return globalThis.ReturnData(200, posts)
                })
                .catch(err => {
                    console.error(err)

                    return globalThis.ReturnData(500, err)
                })

            globalThis.SendPromiseData(res, queryResult)
        } else {
            globalThis.SendData(res, 500)
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export { AllPosts, UserPosts, PostID, UsernamePosts }
