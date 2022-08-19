import { Knex } from 'knex'
import GetUserData, { GetUserDataType } from '@functions/userData'

export type GetFriendDataType = GetUserDataType & {
    areFriends: boolean
}

export const EraseLocalUsername = (username: string, userUsername: string | null, array: string[]) => {
    const index = array.indexOf(username)

    if (index !== -1) {
        array.splice(index, 1)
    }

    if (userUsername) {
        const index2 = array.indexOf(userUsername)

        if (index2 !== -1) {
            array.splice(index2, 1)
        }
    }

    return array
}

const GetColumnArray = async (userID: number, column: string, columnToFind: string, shouldBeFriends: boolean, query: Knex) => {
    return query
        .select(column)
        .whereLike(columnToFind, userID)
        .andWhere(`friends`, shouldBeFriends)
        .from(`users_friends`)
        .then(columnData => {
            return Promise.all(
                columnData.map(async element => {
                    return parseInt(element[column])
                })
            )
        })
}

const GetFriendsList = async (userID: number, query: Knex, includeMe?: boolean) => {
    const senders = await GetColumnArray(userID, 'senderID', 'receiverID', true, query)
    const receivers = await GetColumnArray(userID, 'receiverID', 'senderID', true, query)

    return Promise.all([senders, receivers]).then(values => {
        const returnArray = values[0].concat(values[1])

        if (includeMe) {
            returnArray.push(userID)
        }

        return returnArray
    })
}

export const GetAllInvites = async (userID: number, query: Knex) => {
    const sent = await GetColumnArray(userID, 'receiverID', 'senderID', false, query)
    const pending = await GetColumnArray(userID, 'senderID', 'receiverID', false, query)

    const SentNames = GetDataFromIDs(userID, sent, query)
    const PendingNames = GetDataFromIDs(userID, pending, query)

    return Promise.all([SentNames, PendingNames]).then(values => {
        return {
            sent: values[0],
            received: values[1],
        }
    })
}

export const GetDataFromIDs = async (localID: number, ids: number[], query: Knex, ignoreLocalUser?: boolean) => {
    const fixedIDs = ids.filter(id => {
        if (ignoreLocalUser) {
            return id !== localID
        }
        
        return id
    })

    return Promise.all(
        fixedIDs.map(async ID => {
            const areFriends = await AreFriends(localID, ID, query)

            return GetUserData(ID, query).then(userData => {
                return {
                    areFriends: areFriends,
                    ...userData,
                } as GetFriendDataType
            })
        })
    )
}

export const AreFriends = async (localID: number, userID: number, query: Knex) => {
    const friendsList = await GetFriendsList(localID, query, true)

    return friendsList.indexOf(userID) !== -1
}

export default GetFriendsList
