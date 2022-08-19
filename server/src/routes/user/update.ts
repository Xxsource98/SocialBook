import express from 'express'
import { Knex } from 'knex'

import ArgonHash from '@functions/argon'

const Update = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { username, currentPassword, newPassword, email, bio } = req.body

    if (currentPassword) {
        const newEcryptedPassword = newPassword ? await ArgonHash.Hash(newPassword) : undefined

        if (userData) {
            const encryptedPassword = await ArgonHash.Hash(currentPassword)

            let doesUserExist = true

            await query
                .select(`username`)
                .from(`users`)
                .where(`password`, encryptedPassword)
                .then(usersData => {
                    const user = usersData.find(obj => obj.username === username)

                    doesUserExist = user !== undefined
                })
                .catch(err => {
                    console.error(err)

                    res.status(500).send({
                        status: 'Error',
                        description: err,
                    })
                })

            if (!doesUserExist) {
                const queryResult = await query
                    .update({
                        username: username,
                        password: newEcryptedPassword,
                        email: email,
                        bio: bio,
                    })
                    .where(`ID`, userData.id)
                    .andWhere(`password`, encryptedPassword)
                    .from(`users`)
                    .then(userData => {
                        const success = userData === 1

                        if (success) {
                            return globalThis.ReturnData(200, 'User profile updated')
                        } else {
                            return globalThis.ReturnData(400, 'Invalid password')
                        }
                    })
                    .catch(err => {
                        console.error(err)

                        return globalThis.ReturnData(500, err)
                    })

                globalThis.SendPromiseData(res, queryResult)
            } else {
                globalThis.SendData(res, 400, 'User with this username already exist')
            }
        } else {
            globalThis.SendData(res, 500)
        }
    } else {
        globalThis.SendData(res, 400, 'Current password is empty')
    }
}

export default Update
