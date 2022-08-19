import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Edit2, Trash } from 'react-feather'

type CommentContextMenuType = {
    hover: boolean
    Update: () => void
    Delete: () => void
}

const CommentContextMenu: React.FC<CommentContextMenuType> = ({ hover, Update, Delete }) => {
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        setActive(hover)
    }, [hover])

    return (
        <div className={classNames(active ? 'block' : 'hidden', 'relative', 'w-full', 'gap-2', 'top-0', 'rounded-md', 'flex', 'items-center', 'justify-center')}>
            <Edit2 className={classNames('relative', 'cursor-pointer')} size={24} onClick={Update} />
            <Trash className={classNames('relative', 'cursor-pointer')} size={24} onClick={Delete} />
        </div>
    )
}

export default CommentContextMenu
