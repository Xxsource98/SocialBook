import express from 'express'
import { Knex } from 'knex'

const LikePost = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { postID } = req.body

    if (userData) {
        if (postID) {
            const isPostAlreadyLiked = await query
                .select(`postID`)
                .where(`postID`, postID)
                .andWhere(`userID`, userData.id)
                .from(`users_likes`)
                .then(likesData => {
                    return likesData.length > 0
                })

            if (isPostAlreadyLiked) {
                const queryResult = await query
                    .where(`postID`, postID)
                    .andWhere(`userID`, userData.id)
                    .from(`users_likes`)
                    .delete()
                    .then(() => {
                        return globalThis.ReturnData(200, 'Post is unliked')
                    })
                    .catch(err => {
                        console.error(err)

                        return globalThis.ReturnData(500, err)
                    })

                globalThis.SendPromiseData(res, queryResult)
            } else {
                const queryResult = await query
                    .insert({
                        postID: postID,
                        userID: userData.id,
                    })
                    .into(`users_likes`)
                    .then(() => {
                        return globalThis.ReturnData(200, 'Post is liked')
                    })
                    .catch(err => {
                        console.error(err)

                        return globalThis.ReturnData(500, err)
                    })

                globalThis.SendPromiseData(res, queryResult)
            }
        } else {
            globalThis.SendData(res, 400, 'Invalid post')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export default LikePost
