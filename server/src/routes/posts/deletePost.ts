import express from 'express'
import { Knex } from 'knex'

const DeletePost = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { postID } = req.body

    if (userData) {
        const poster = userData.id

        if (postID) {
            const queryResult = await query
                .where(`ID`, postID)
                .andWhere(`posterID`, poster)
                .delete()
                .from(`users_posts`)
                .then(commentData => {
                    const success = commentData === 1

                    if (success) {
                        return globalThis.ReturnData(200, 'Post deleted')
                    } else {
                        return globalThis.ReturnData(400, 'Post does not exist')
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

export default DeletePost
