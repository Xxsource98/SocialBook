import React, { useCallback, useEffect, useState } from 'react'

import DashboardPost, { PostSkeleton } from '@components/dashboard/dashboardPost'

import { UserType } from '@functions/api/user/GetUserInfo'
import { PostType } from '@functions/api/posts/GetPosts'

type UserPostsType = {
    userData: UserType | null
    posts: PostType[]
    postsLoading: boolean
    LikePost: (postID: number) => Promise<PostType>
    RefreshPost: (postID: number) => Promise<PostType>
    UpdatePost: (postID: number, title: string, description: string) => Promise<boolean | void>
    DeletePost: (postID: number) => Promise<boolean | void>
}

const UserPosts: React.FC<UserPostsType> = ({ userData, posts, postsLoading, LikePost, RefreshPost, UpdatePost, DeletePost }) => {
    const [localPosts, setPosts] = useState<PostType[]>([])

    const InitLocalPosts = useCallback(() => {
        setPosts(posts)
    }, [posts])

    useEffect(() => {
        InitLocalPosts()
    }, [InitLocalPosts])

    const DeletePostFunc = async (postID: number) => {
        const deleteData = await DeletePost(postID)

        if (deleteData) {
            setPosts(localPosts.filter(item => item.id !== postID))
        }

        return deleteData
    }

    const DrawPosts = () => {
        if (postsLoading) {
            return <PostSkeleton />
        }

        const postsToDraw = localPosts.map((post, i) => {
            return <DashboardPost key={i} amIposter={post.poster === userData?.username} ID={post.id} username={post.poster} localUser={userData?.username as string} firstName={post.firstName} lastName={post.lastName} profilePicture={post.profilePicture} createDate={post.createDate} userProfilePicture={userData?.profilePicture as string} title={post.title} description={post.description} likes={post.likes} commentsCount={post.commentsCount} likesCount={post.likesCount} LikePost={LikePost} RefreshPost={RefreshPost} UpdatePost={UpdatePost} DeletePost={DeletePostFunc} />
        })

        return <React.Fragment>{postsToDraw}</React.Fragment>
    }

    return <DrawPosts />
}

export default UserPosts
