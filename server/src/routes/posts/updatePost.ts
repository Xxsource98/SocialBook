import express from 'express'
import { Knex } from 'knex'

const UpdatePost = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { postID, title, description } = req.body

    if (userData) {
        const poster = userData.id

        const queryResult = await query
            .update({
                title: title,
                description: description,
            })
            .where(`ID`, postID)
            .andWhere(`posterID`, poster)
            .from(`users_posts`)
            .then(postData => {
                const success = postData === 1

                if (success) {
                    return globalThis.ReturnData(200, 'Post updated')
                } else {
                    return globalThis.ReturnData(400, 'Invalid post')
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

export default UpdatePost
