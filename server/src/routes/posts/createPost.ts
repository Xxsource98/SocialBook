import express from 'express'
import { Knex } from 'knex'

const CreatePost = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { title, description } = req.body

    if (userData) {
        if (title && description) {
            const currentDate = new Date()

            const newPost = await query
                .insert({
                    posterID: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    createDate: currentDate,
                    title: title,
                    description: description,
                })
                .into(`users_posts`)
                .then(data => data[0])

            if (newPost) {
                const profilePicture = await query
                    .select(`profilePicture`)
                    .where(`ID`, userData.id)
                    .from(`users`)
                    .then(picturesData => {
                        if (picturesData.length > 0) {
                            return picturesData[0].profilePicture
                        }

                        return 'default.png'
                    })

                globalThis.SendData(res, 200, {
                    ID: newPost,
                    poster: userData.username,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    profilePicture: profilePicture,
                    createDate: currentDate,
                    title: title,
                    description: description,
                    likes: [],
                    likesCount: 0,
                    commentsCount: 0,
                })
            } else {
                globalThis.SendData(res, 500)
            }
        } else {
            globalThis.SendData(res, 400, 'Fields are empty')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export default CreatePost
