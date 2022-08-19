import { Knex } from 'knex'

export type CommentsType = {
    ID: number
    postID: number
    poster: string
    firstName: string
    lastName: string
    comment: string
    profilePicture: string
    createDate: string
}

export const ConvertCommentsArray = async (comments: any[], query: Knex): Promise<CommentsType[]> => {
    if (comments.length > 0) {
        const newCommentsArray = await Promise.all(
            comments.map(async comment => {
                let profilePicture = ''

                const poster = await query
                    .select(`username`)
                    .where(`ID`, comment.posterID)
                    .from(`users`)
                    .then(posterData => {
                        return posterData[0].username
                    })

                await query
                    .select(`profilePicture`)
                    .where(`ID`, comment.posterID)
                    .from(`users`)
                    .then(picturesData => {
                        if (picturesData.length > 0) {
                            profilePicture = picturesData[0].profilePicture
                        } else {
                            profilePicture = 'default.png'
                        }
                    })

                return {
                    ID: comment.ID,
                    postID: comment.postID,
                    poster: poster,
                    firstName: comment.firstName,
                    lastName: comment.lastName,
                    comment: comment.comment,
                    profilePicture: profilePicture,
                    createDate: comment.createDate,
                }
            })
        )

        return newCommentsArray
    }

    return []
}
