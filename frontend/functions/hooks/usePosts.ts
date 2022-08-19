import { useCallback, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

import GetPosts, { GetPostByID, PostType } from '@functions/api/posts/GetPosts'
import CreatePost from '@functions/api/posts/CreatePost'
import LikePostApi from '@functions/api/posts/LikePost'
import UpdatePostApi from '@functions/api/posts/UpdatePost'
import DeletePostApi from '@functions/api/posts/DeletePost'

const usePosts = (username?: string) => {
    const [postsLoading, setLoading] = useState<boolean>(false)
    const [posts, setPosts] = useState<PostType[]>([])

    const FetchPosts = useCallback(async () => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''
        setLoading(true)

        await GetPosts(accessToken, username)
            .then(postsData => {
                setPosts(postsData.reverse())
            })
            .catch(ex => console.error(ex.response?.data ?? ex))

        setLoading(false)
    }, [username])

    useEffect(() => {
        FetchPosts()
    }, [FetchPosts])

    const NewPost = async (title: string, description: string) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return CreatePost(accessToken, title, description)
    }

    const LikePost = async (postID: number) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        await LikePostApi(accessToken, postID)

        return RefreshPost(postID)
    }

    const RefreshPost = async (postID: number) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return GetPostByID(accessToken, postID)
    }

    const UpdatePost = async (postID: number, title: string, description: string) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return UpdatePostApi(accessToken, postID, title, description)
    }

    const DeletePost = async (postID: number) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return DeletePostApi(accessToken, postID)
    }

    return { posts, postsLoading, NewPost, LikePost, RefreshPost, UpdatePost, DeletePost }
}

export default usePosts
