import express from 'express'
import { Knex } from 'knex'

import GetFriendsList, { GetDataFromIDs } from '@functions/friendsList'

export const AreWeFriends = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { user } = req.params

    if (userData) {
        const userID = await query
            .select(`ID`)
            .where(`username`, user)
            .from(`users`)
            .then(userData => {
                return userData[0]?.ID
            })
        const friendsList = await GetFriendsList(userData.id, query, true)
        const areWeFriends = friendsList.indexOf(userID) !== -1

        globalThis.SendData(res, 200, areWeFriends)
    } else {
        globalThis.SendData(res, 500)
    }
}

export const UserFriendsList = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { userid } = req.params

    if (userData) {
        if (userid) {
            const friendsIDs = await GetFriendsList(parseInt(userid), query)
            const friends = await GetDataFromIDs(userData.id, friendsIDs, query)

            globalThis.SendData(res, 200, friends)
        } else {
            globalThis.SendData(res, 400, 'Invalid user')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export const UsernameFriendsList = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { user } = req.params

    if (userData) {
        const userID = await query
            .select(`ID`)
            .where(`username`, user)
            .from(`users`)
            .then(userData => {
                return userData[0]?.ID
            })

        if (userID) {
            const friendsIDs = await GetFriendsList(userID, query)
            const friends = await GetDataFromIDs(userData.id, friendsIDs, query, false)

            globalThis.SendData(res, 200, friends)
        } else {
            globalThis.SendData(res, 400, 'Invalid user')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

const FriendsList = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals

    if (userData) {
        const friendsIDsList = await GetFriendsList(userData.id, query)
        const friendsList = await GetDataFromIDs(userData.id, friendsIDsList, query)

        globalThis.SendData(res, 200, friendsList)
    } else {
        globalThis.SendData(res, 500)
    }
}

export default FriendsList
