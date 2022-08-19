import express from 'express'
import { Knex } from 'knex'

import GetUserData from '@functions/userData'

export const InfoUsername = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { user } = req.params

    if (userData) {
        if (user) {
            const userID = await query
                .select(`ID`)
                .where(`username`, user)
                .from(`users`)
                .then(userData => {
                    return userData[0]?.ID
                })
            const userInfo = await GetUserData(userID, query)

            globalThis.SendData(res, 200, userInfo)
        } else {
            const userInfo = await GetUserData(userData.id, query)

            globalThis.SendData(res, 200, userInfo)
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

const Info = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { userid } = req.params

    if (userData) {
        if (userid) {
            const userInfo = await GetUserData(parseInt(userid), query)

            globalThis.SendData(res, 200, userInfo)
        } else {
            const userInfo = await GetUserData(userData.id, query)

            globalThis.SendData(res, 200, userInfo)
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export default Info
