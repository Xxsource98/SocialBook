import express from 'express'
import { Knex } from 'knex'

import ArgonHash from '@functions/argon'

const CheckPassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}/

    return regex.test(password)
}

const Register = async (req: express.Request, res: express.Response, query: Knex) => {
    const { username, password, email, firstName, lastName } = req.body

    const doesUserExist = await query
        .select(`username`)
        .from(`users`)
        .then(usersData => {
            const user = usersData.find(obj => obj.username === username)

            return user !== undefined
        })
        .catch(err => {
            console.error(err)

            return false
        })

    if (!doesUserExist) {
        const encryptedPassword = await ArgonHash.Hash(password)

        if (username && password && email && firstName && lastName) {
            if (CheckPassword(password)) {
                const queryResult = await query
                    .insert({
                        username: username,
                        password: encryptedPassword,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        profilePicture: 'default.png',
                    })
                    .into(`users`)
                    .then(() => {
                        return globalThis.ReturnData(200, 'Registered In')
                    })
                    .catch(err => {
                        console.error(err)

                        return globalThis.ReturnData(500, err)
                    })

                globalThis.SendPromiseData(res, queryResult)
            } else {
                globalThis.SendData(res, 400, 'Password has not valid credentials')
            }
        } else {
            globalThis.SendData(res, 400, 'Fields are empty')
        }
    } else {
        globalThis.SendData(res, 400, 'User with this username already exist')
    }
}

export default Register
