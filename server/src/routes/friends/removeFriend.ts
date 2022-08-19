import express from 'express'
import { Knex } from 'knex'

const RemoveFriend = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { friendToRemove } = req.body

    if (userData) {
        if (friendToRemove) {
            const queryResult = await query
                .select(`friends`)
                .whereLike(`senderID`, friendToRemove)
                .orWhereLike(`senderID`, userData.id)
                .andWhereLike(`receiverID`, friendToRemove)
                .orWhereLike(`receiverID`, userData.id)
                .from(`users_friends`)
                .then(friendsData => {
                    if (friendsData.length > 0) {
                        if (friendsData[0].friends === 1) {
                            return query
                                .whereLike(`senderID`, friendToRemove)
                                .orWhereLike(`senderID`, userData.id)
                                .andWhereLike(`receiverID`, friendToRemove)
                                .orWhereLike(`receiverID`, userData.id)
                                .from(`users_friends`)
                                .delete()
                                .then(removeData => {
                                    const success = removeData === 1

                                    if (success) {
                                        return globalThis.ReturnData(200, 'Friend removed')
                                    } else {
                                        return globalThis.ReturnData(400, 'Failed to remove friend')
                                    }
                                })
                                .catch(err => {
                                    console.error(err)

                                    return globalThis.ReturnData(500, err)
                                })
                        } else {
                            return globalThis.ReturnData(400, 'You are not a friends')
                        }
                    } else {
                        return globalThis.ReturnData(400, 'Invalid user')
                    }
                })
                .catch(err => {
                    console.error(err)

                    return globalThis.ReturnData(500, err)
                })

            globalThis.SendPromiseData(res, queryResult)
        } else {
            globalThis.SendData(res, 400, 'Invalid user')
        }
    } else {
        globalThis.SendData(res, 500)
    }
}

export default RemoveFriend
