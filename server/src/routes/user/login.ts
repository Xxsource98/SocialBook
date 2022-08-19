import express from 'express'
import { Knex } from 'knex'

import JWT from '@functions/jwt'
import ArgonHash from '@functions/argon'

const CheckPassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}/

    return regex.test(password)
}

const Login = async (req: express.Request, res: express.Response, query: Knex) => {
    const { username, password } = req.body

    if (CheckPassword(password)) {
        const encryptedPassword = await ArgonHash.Hash(password)

        const loginData = await query
            .select(`id`, `username`, `firstName`, `lastName`)
            .where(`username`, username)
            .andWhere(`password`, encryptedPassword)
            .from(`users`)
            .then(data => {
                if (data.length > 0) {
                    return {
                        description: 'Logged In',
                        user: data[0],
                    }
                } else {
                    return {
                        description: 'Invalid username or password',
                        user: null,
                    }
                }
            })
            .catch(err => {
                console.error(err)

                return {
                    description: err,
                    user: null,
                }
            })

        if (loginData.user) {
            res.status(200).send({
                status: 'Success',
                description: 'Logged In',
                tokens: JWT.Sign({
                    id: loginData.user.id as string,
                    username: username,
                    firstName: loginData.user.firstName,
                    lastName: loginData.user.lastName,
                }),
            })
        } else {
            globalThis.SendData(res, 400, loginData.description)
        }
    } else {
        globalThis.SendData(res, 400, 'Invalid Password')
    }
}

export default Login
