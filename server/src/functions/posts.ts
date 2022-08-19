import { Knex } from 'knex'

export const GetFriendsRawSQL = (friendsIDList: number[]) => {
    let rawString = 'SELECT * FROM users_posts'

    friendsIDList.forEach(friend => {
        if (rawString.indexOf('where') === -1) {
            rawString += ` where posterID='${friend}'`
        } else {
            rawString += ` or posterID='${friend}'`
        }
    })

    return rawString
}

const ConvertPosts = async (posts: any[], query: Knex) => {
    if (posts.length > 0) {
        const newPostsArray = await Promise.all(
            posts.map(async post => {
                let profilePicture = ''

                await query
                    .select(`profilePicture`)
                    .where(`ID`, post.posterID)
                    .from(`users`)
                    .then(picturesData => {
                        if (picturesData.length > 0) {
                            profilePicture = picturesData[0].profilePicture
                        } else {
                            profilePicture = 'default.png'
                        }
                    })

                const poster = await query
                    .select(`username`)
                    .where(`ID`, post.posterID)
                    .from(`users`)
                    .then(posterData => {
                        return posterData[0].username
                    })

                const commentsArray = await query.select(`ID`).where(`postID`, post.ID).from(`users_comments`)

                const likesArray = await query.select(`userID`).where(`postID`, post.ID).from(`users_likes`)

                const fixedLikesArray = await Promise.all(
                    likesArray.map(async user => {
                        const userID = user.userID
                        const users = await query
                            .select(`username`)
                            .where(`ID`, userID)
                            .from(`users`)
                            .then(userData => {
                                return userData[0].username
                            })

                        return users
                    })
                )

                return {
                    ID: post.ID,
                    poster: poster,
                    firstName: post.firstName,
                    lastName: post.lastName,
                    profilePicture: profilePicture,
                    createDate: post.createDate,
                    title: post.title,
                    description: post.description,
                    likes: fixedLikesArray,
                    likesCount: likesArray.length,
                    commentsCount: commentsArray.length,
                }
            })
        )

        return newPostsArray
    }

    return []
}

export default ConvertPosts
