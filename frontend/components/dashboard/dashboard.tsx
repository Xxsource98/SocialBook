import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

import useUser from '@functions/hooks/useUser'
import { PostType } from '@functions/api/posts/GetPosts'

import Section from '@components/dashboard/dashboardSection'
import DashboardCreatePost from '@components/dashboard/dashboardCreatePost'
import DashboardPost, { PostSkeleton } from '@components/dashboard/dashboardPost'
import usePosts from '@functions/hooks/usePosts'
import PageWrapper from '@components/elements/pageWrapper'

const Dashboard: React.FC = () => {
    const [localPosts, setPosts] = useState<PostType[]>([])

    const [userData, userLoading] = useUser()
    const { posts, postsLoading, NewPost, LikePost, RefreshPost, UpdatePost, DeletePost } = usePosts()

    const InitLocalPosts = useCallback(() => {
        setPosts(posts)
    }, [posts])

    useEffect(() => {
        InitLocalPosts()
    }, [InitLocalPosts])

    const CreatePostFunc = async (title: string, description: string) => {
        const createData = await NewPost(title, description)

        if (createData) {
            setPosts([createData, ...localPosts])
        }

        return createData
    }

    const DeletePostFunc = async (postID: number) => {
        const deleteData = await DeletePost(postID)

        if (deleteData) {
            setPosts(localPosts.filter(item => item.id !== postID))
        }

        return deleteData
    }

    const DrawPosts = () => {
        if (postsLoading && userLoading) {
            return <PostSkeleton />
        }

        if (localPosts.length === 0) {
            return <h2 className={classNames('relative', 'text-center', 'text-lg', 'font-medium', 'p-2')}>There aren&apos;t any posts ;/</h2>
        }

        const postsToDraw = localPosts.map((post, i) => {
            return <DashboardPost key={i} amIposter={post.poster === userData?.username} ID={post.id} username={post.poster} localUser={userData?.username as string} firstName={post.firstName} lastName={post.lastName} profilePicture={post.profilePicture} userProfilePicture={userData?.profilePicture as string} title={post.title} description={post.description} likes={post.likes} commentsCount={post.commentsCount} likesCount={post.likesCount} createDate={post.createDate} LikePost={LikePost} RefreshPost={RefreshPost} UpdatePost={UpdatePost} DeletePost={DeletePostFunc} />
        })

        return <React.Fragment>{postsToDraw}</React.Fragment>
    }

    return (
        <PageWrapper header="Timeline">
            <Section className={classNames('relative', 'w-full', 'lg:w-[600px]')} inDashboard>
                <DashboardCreatePost CreatePost={CreatePostFunc} />
            </Section>
            <div className={classNames('relative', 'w-full', 'lg:w-[600px]', 'flex', 'flex-col', 'gap-3')}>
                <DrawPosts />
            </div>
        </PageWrapper>
    )
}

export default Dashboard
