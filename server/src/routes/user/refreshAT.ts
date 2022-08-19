import express from 'express'

import JWT from '@functions/jwt'

const RefreshAT = async (req: express.Request, res: express.Response) => {
    const { userData } = res.locals
    const { id, username } = req.body

    if (id && username) {
        if (userData) {
            if (userData.id === id) {
                const tokens = JWT.Sign({
                    id: userData.id,
                    username: username,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                })

                res.status(200).send({
                    status: 'Success',
                    description: 'Tokens refreshed',
                    tokens: tokens,
                })
            } else {
                res.status(400).send({
                    status: 'Error',
                    description: 'Invalid user',
                })
            }
        } else {
            res.status(500).send({
                status: 'Error',
                description: 'Internal Server Error',
            })
        }
    } else {
        res.status(400).send({
            status: 'Failed',
            description: 'Fields are empty',
        })
    }
}

export default RefreshAT
