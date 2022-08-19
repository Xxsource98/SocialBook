import React, { useState } from 'react'
import classNames from 'classnames'

import Input, { Textarea } from '@components/elements/input'
import { ButtonSubmit } from '@components/elements/button'
import { PostType } from '@functions/api/posts/GetPosts'

type DashboardCreatePostType = {
    CreatePost: (title: string, description: string) => Promise<PostType>
}

const DashboardCreatePost: React.FC<DashboardCreatePostType> = ({ CreatePost }) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const CreatePostFunc = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        await CreatePost(title, description)
    }

    return (
        <div className={classNames('relative', 'flex', 'flex-col', 'gap-3')}>
            <div className={classNames('relative', 'flex', 'items-center', 'gap-3')}>
                <h2 className={classNames('relative', 'text-lg', 'font-medium', 'py-2', 'xs:text-xl')}>Create new post!</h2>
            </div>
            <form className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'w-full', 'items-end')} onSubmit={CreatePostFunc}>
                <Input type="text" placeholder="Your new post title" onChange={ev => setTitle(ev.currentTarget.value)} required />
                <Textarea type="text" placeholder="Your new post title" onChange={ev => setDescription(ev.currentTarget.value)} minHeight={40} maxHeight={180} required />
                <div className={classNames('relative', 'w-32')}>
                    <ButtonSubmit value="Create Post" />
                </div>
            </form>
        </div>
    )
}

export default DashboardCreatePost
