import express from 'express'
import { Knex } from 'knex'

const Delete = async (req: express.Request, res: express.Response, query: Knex) => {
    const { password } = req.body
    const { userData } = res.locals

    if (userData) {
        const user = userData.username

        const isDeleted = await query
            .where(`username`, user)
            .andWhere(`password`, password)
            .delete()
            .from(`users`)
            .then(userData => {
                const success = userData === 1

                return success
            })
            .catch(err => {
                console.error(err)

                return false
            })

        if (isDeleted) {
            globalThis.SendData(res, 200, 'User is deleted')
        } else {
            globalThis.SendData(res, 400, 'Failed to delete user')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export default Delete
