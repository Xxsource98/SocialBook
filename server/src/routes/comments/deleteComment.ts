import express from 'express'
import { Knex } from 'knex'

const DeleteComment = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { commentID } = req.body

    if (userData) {
        if (commentID) {
            const queryResult = await query
                .where(`ID`, commentID)
                .andWhere(`posterID`, userData.id)
                .delete()
                .from(`users_comments`)
                .then(commentData => {
                    const success = commentData === 1

                    if (success) {
                        return globalThis.ReturnData(200, 'Comment deleted')
                    } else {
                        return globalThis.ReturnData(400, 'Comment does not exist')
                    }
                })
                .catch(err => {
                    console.error(err)

                    return globalThis.ReturnData(500, err)
                })

            globalThis.SendPromiseData(res, queryResult)
        } else {
            globalThis.SendData(res, 400, 'Fields are empty')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export default DeleteComment
