import express from 'express'
import { Knex } from 'knex'

const CreateInvite = async (sender: number, receiver: number, query: Knex) => {
    return query
        .insert({
            senderID: sender,
            receiverID: receiver,
            friends: 0,
        })
        .into(`users_friends`)
}

const AddFriend = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    const { inviteUserID } = req.body

    if (userData) {
        if (inviteUserID) {
            const queryResult = await query
                .select(`friends`)
                .where(`senderID`, userData.id)
                .andWhere(`receiverID`, inviteUserID)
                .from(`users_friends`)
                .then(async friendsData => {
                    if (friendsData.length > 0) {
                        if (friendsData[0].friends === 1) {
                            return globalThis.ReturnData(400, 'You are already friends')
                        } else {
                            return globalThis.ReturnData(400, 'User is already invited')
                        }
                    }

                    return CreateInvite(userData.id, inviteUserID, query).then(() => {
                        return globalThis.ReturnData(200, 'Invite sent')
                    })
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

export default AddFriend
