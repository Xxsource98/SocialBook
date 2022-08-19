import express from 'express'

const Validate = async (req: express.Request, res: express.Response) => {
    const { userData, refreshedAccessToken } = res.locals

    if (refreshedAccessToken) {
        res.status(200).send({
            status: 'Success',
            description: 'New Token is created',
            tokens: refreshedAccessToken,
        })
    } else {
        if (userData) {
            globalThis.SendData(res, 200, 'Token is valid')
        } else {
            globalThis.SendData(res, 400, 'Invalid token')
        }
    }
}

export default Validate
