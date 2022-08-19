import express from 'express'
import { Knex } from 'knex'

const PostComments = async (req: express.Request, res: express.Response, query: Knex) => {
    const postID = req.params.postid

    const queryResult = await query
        .select(`*`)
        .from(`users_comments`)
        .where(`postID`, postID)
        .then(comments => {
            return globalThis.ReturnData(200, comments)
        })
        .catch(err => {
            console.error(err)

            return globalThis.ReturnData(500, err)
        })

    globalThis.SendPromiseData(res, queryResult)
}

export default PostComments
