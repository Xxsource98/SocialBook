import express from 'express'
import { Knex } from 'knex'

const AllUsers = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { search } = req.params

    if (userData) {
        let allUsers: string | string[] = 'Failed to Fetch'

        if (search) {
            allUsers = await query
                .select(`username`)
                .whereLike(`username`, `${search}%`)
                .from(`users`)
                .then(usersData => {
                    return usersData.map(e => {
                        return e.username as string
                    })
                })
                .catch(err => {
                    console.error(err)
                    return err
                })
        } else {
            allUsers = await query
                .select(`username`)
                .from(`users`)
                .then(usersData => {
                    return usersData.map(e => {
                        return e.username as string
                    })
                })
                .catch(err => {
                    console.error(err)
                    return err
                })
        }

        globalThis.SendData(res, 200, allUsers)
    } else {
        globalThis.SendData(res, 500)
    }
}

export default AllUsers
