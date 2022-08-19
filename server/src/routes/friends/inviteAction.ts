import express from 'express'
import { Knex } from 'knex'

type InviteActionType = 'accept' | 'deny'

const HandleAction = async (query: Knex, sender: number, receiver: number, action: InviteActionType) => {
    if (action === 'accept') {
        return query
            .update({
                friends: 1,
            })
            .where(`senderID`, sender)
            .andWhere(`receiverID`, receiver)
            .from(`users_friends`)
            .then(acceptData => {
                const success = acceptData === 1

                return success as boolean
            })
    }

    if (action === 'deny') {
        return query
            .where(`senderID`, sender)
            .andWhere(`receiverID`, receiver)
            .delete()
            .from(`users_friends`)
            .then(denyData => {
                const success = denyData === 1

                return success as boolean
            })
    }

    return null
}

export const CancelAction = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { receiverID } = req.body

    if (userData) {
        if (receiverID) {
            const isValid = await query
                .select(`friends`)
                .where(`senderID`, userData.id)
                .andWhere(`receiverID`, receiverID)
                .from(`users_friends`)
                .then(friendsData => {
                    return friendsData[0].friends === 0 ?? false
                })

            if (isValid) {
                const cancelData = await query
                    .select(`friends`)
                    .where(`senderID`, userData.id)
                    .andWhere(`receiverID`, receiverID)
                    .from(`users_friends`)
                    .delete()
                    .then(removeData => {
                        return removeData === 1
                    })

                if (cancelData) {
                    globalThis.SendData(res, 200, 'Invite canceled')
                } else {
                    globalThis.SendData(res, 400, 'Failed to cancel invite')
                }
            } else {
                globalThis.SendData(res, 400, 'Invalid invite')
            }
        } else {
            globalThis.SendData(res, 400, 'Invalid user')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

const InviteAction = async (action: InviteActionType, req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { senderID } = req.body

    if (userData) {
        if (senderID) {
            const isValidInvite = await query
                .select(`friends`)
                .where(`senderID`, senderID)
                .andWhere(`receiverID`, userData.id)
                .from(`users_friends`)
                .then(friendsData => {
                    if (friendsData.length > 0) {
                        if (friendsData[0].friends !== 1) {
                            return true
                        }
                    }

                    return false
                })
                .catch(err => {
                    console.error(err)

                    return false
                })

            if (isValidInvite) {
                const queryResult = await HandleAction(query, senderID, userData.id, action)
                    .then(isSuccess => {
                        if (isSuccess) {
                            return globalThis.ReturnData(200, 'Invite accepted')
                        } else {
                            return globalThis.ReturnData(400, 'Failed to accept invite')
                        }
                    })
                    .catch(err => {
                        console.error(err)

                        return globalThis.ReturnData(500, err)
                    })

                globalThis.SendPromiseData(res, queryResult)
            } else {
                globalThis.SendData(res, 400, 'Invalid Invite')
            }
        } else {
            globalThis.SendData(res, 400, 'Invalid user')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export default InviteAction
