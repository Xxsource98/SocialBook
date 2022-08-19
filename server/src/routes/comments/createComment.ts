import express from 'express'
import { Knex } from 'knex'

import { ConvertCommentsArray } from '@functions/comments'

const CreateComment = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { postID, comment } = req.body

    if (userData) {
        const poster = userData.username

        if (postID >= 0 && poster && comment) {
            const isAdded = await query
                .insert({
                    postID: postID,
                    posterID: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    createDate: new Date(),
                    comment: comment,
                })
                .into(`users_comments`)
                .then(() => {
                    return true
                })

            if (isAdded) {
                const queryResult = await query
                    .select(`*`)
                    .from(`users_comments`)
                    .where(`postID`, postID)
                    .then(async commentsData => {
                        const lastComment = commentsData[commentsData.length - 1]

                        if (lastComment) {
                            const comments = await ConvertCommentsArray([lastComment], query)

                            return globalThis.ReturnData(200, comments)
                        } else {
                            return globalThis.ReturnData(400, 'Invalid comment')
                        }
                    })
                    .catch(err => {
                        console.error(err)

                        return globalThis.ReturnData(500, err)
                    })

                globalThis.SendPromiseData(res, queryResult)
            }
        } else {
            globalThis.SendData(res, 400, 'Fields are empty')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export default CreateComment
