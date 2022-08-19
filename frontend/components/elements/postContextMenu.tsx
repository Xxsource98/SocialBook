import classNames from 'classnames'
import React, { useState } from 'react'
import { Edit2, MoreVertical, Trash } from 'react-feather'

type PostContextMenuType = {
    Update: () => void
    Delete: () => void
}

const PostContextMenu: React.FC<PostContextMenuType> = ({ Update, Delete }) => {
    const [contextOpened, toggleContext] = useState<boolean>(false)

    const ToggleOptions = () => toggleContext(!contextOpened)

    return (
        <div className={classNames('relative')}>
            <MoreVertical className={classNames('relative', 'text-gray-800', 'dark:text-slate-300', 'cursor-pointer', 'rounded-xl')} size={24} onClick={ToggleOptions} />
            <div className={classNames(contextOpened ? 'block' : 'hidden', 'absolute', 'top-7', 'right-2', 'rounded-md', 'flex', 'flex-col', 'z-10', 'bg-slate-300', 'dark:bg-slate-800')}>
                <div className={classNames('relative', 'flex', 'gap-3', 'p-2', 'cursor-pointer', 'rounded-md', 'hover:bg-slate-400', 'dark:hover:bg-slate-700')} onClick={Update}>
                    <Edit2 size={24} />
                    <p>Edit</p>
                </div>
                <div className={classNames('relative', 'flex', 'gap-3', 'p-2', 'cursor-pointer', 'rounded-md', 'hover:bg-slate-400', 'dark:hover:bg-slate-700')} onClick={Delete}>
                    <Trash size={24} />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default PostContextMenu
