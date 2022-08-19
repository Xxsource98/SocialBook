import express from 'express'

import JWT from '@functions/jwt'

const VerifyUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.headers.authorization

    if (!accessToken) {
        return res.status(400).send({
            status: 'Failed',
            description: 'Invalid access token',
        })
    }

    const jwtResponse = JWT.Validate(accessToken)

    const refreshToken = req.body.refreshToken
    if (refreshToken) {
        const refreshTokenResponse = JWT.Validate(refreshToken, true)

        if (!jwtResponse.loggedIn && refreshTokenResponse.loggedIn) {
            const newToken = JWT.Sign({
                id: refreshTokenResponse.data.id,
                username: refreshTokenResponse.data.username,
                firstName: refreshTokenResponse.data.firstName,
                lastName: refreshTokenResponse.data.lastName,
            })

            res.locals.refreshedAccessToken = newToken

            next()
        } else {
            if (jwtResponse.loggedIn) {
                res.locals.userData = {
                    id: jwtResponse.data.id,
                    username: jwtResponse.data.username,
                    firstName: jwtResponse.data.firstName,
                    lastName: jwtResponse.data.lastName,
                }

                next()
            } else {
                return res.status(400).send({
                    status: 'Failed',
                    description: 'User is not logged in',
                })
            }
        }
    } else {
        if (jwtResponse.error) {
            return res.status(500).send({
                status: 'Failed',
                description: jwtResponse.error.name ?? jwtResponse.error,
            })
        } else {
            if (jwtResponse.loggedIn) {
                res.locals.userData = {
                    id: jwtResponse.data.id,
                    username: jwtResponse.data.username,
                    firstName: jwtResponse.data.firstName,
                    lastName: jwtResponse.data.lastName,
                }

                next()
            } else {
                return res.status(400).send({
                    status: 'Failed',
                    description: 'User is not logged in',
                })
            }
        }
    }
}

export default VerifyUser
