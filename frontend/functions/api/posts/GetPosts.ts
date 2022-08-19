import axios from 'axios'

import { NotificationError } from '@functions/Notifications'

export type PostType = {
    id: number
    poster: string
    firstName: string
    lastName: string
    profilePicture: string
    createDate: Date
    title: string
    description: string
    likes: string[]
    likesCount: number
    commentsCount: number
}

const GetPosts = async (token: string, username?: string): Promise<PostType[]> => {
    const posts: PostType[] = []

    const url = username ? `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/posts/username/${username}` : `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/posts`

    await axios
        .get(url, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            const data = res.data.description

            data.forEach((post: any) => {
                // eslint-disable-line
                posts.push({
                    id: post.ID,
                    poster: post.poster,
                    firstName: post.firstName,
                    lastName: post.lastName,
                    profilePicture: post.profilePicture,
                    createDate: new Date(post.createDate),
                    title: post.title,
                    description: post.description,
                    likes: post.likes,
                    likesCount: post.likesCount,
                    commentsCount: post.commentsCount,
                })
            })
        })
        .catch(ex => console.error(ex.response?.data))

    return posts
}

export const GetPostByID = async (token: string, postID: number): Promise<PostType> => {
    return axios
        .get(`${process.env.SERVER_URL}:${process.env.SERVER_PORT}/posts/id/${postID}`, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            return res.data.description[0]
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error} (${postID})`)
        })
}

export default GetPosts
