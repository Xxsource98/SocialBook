import express from 'express'
import { Knex } from 'knex'

import { GetAllInvites } from '@functions/friendsList'

const CurrentInvites = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals

    if (userData) {
        const friendsList = await GetAllInvites(userData.id, query)

        globalThis.SendData(res, 200, friendsList)
    } else {
        globalThis.SendData(res, 500)
    }
}

export default CurrentInvites
