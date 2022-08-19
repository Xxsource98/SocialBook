import express from 'express'
import { Knex } from 'knex'

const UpdateComment = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { commentID, comment } = req.body

    if (userData) {
        const queryResult = await query
            .update({
                comment: comment,
            })
            .where(`ID`, commentID)
            .andWhere(`posterID`, userData.id)
            .from(`users_comments`)
            .then(commentData => {
                const success = commentData === 1

                if (success) {
                    return globalThis.ReturnData(200, 'Comment updated')
                } else {
                    return globalThis.ReturnData(400, 'Invalid comment')
                }
            })
            .catch(err => {
                console.error(err)

                return globalThis.ReturnData(500, err)
            })

        globalThis.SendPromiseData(res, queryResult)
    } else {
        globalThis.SendData(res, 500)
    }
}

export default UpdateComment
