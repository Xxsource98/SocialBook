import React, { useState } from 'react'
import classNames from 'classnames'

import { CommentType } from '@functions/api/comments/GetPostComments'

import Input from '@components/elements/input'
import ProfilePictureComponent from '@components/elements/profilePicture'

type DashboardCreateCommentType = {
    userProfilePicture: string
    createComment: (comment: string) => Promise<CommentType | void>
}

const DashboardCreateComment = React.forwardRef<HTMLInputElement, DashboardCreateCommentType>((props, ref) => {
    const { userProfilePicture, createComment } = props
    const [comment, setComment] = useState<string>('')

    const CreateCommentFunc = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        return createComment(comment)
    }

    return (
        <div className={classNames('relative', 'flex', 'items-center', 'gap-3', 'mt-5', 'xs:px-3')}>
            <div className={classNames('relative', 'w-12', 'h-12')}>
                <ProfilePictureComponent src={userProfilePicture} layout="responsive" width={48} height={48} />
            </div>
            <form className={classNames('relative', 'w-full', 'flex', 'gap-3')} onSubmit={CreateCommentFunc}>
                <Input ref={ref} title="Press Enter to create" type="text" placeholder="Comment..." style={{ width: '100%' }} onChange={ev => setComment(ev.currentTarget.value)} required />
            </form>
        </div>
    )
})
DashboardCreateComment.displayName = 'DashboardCreateComment'

export default DashboardCreateComment
