import { Knex } from 'knex'

export type GetUserDataType = {
    id: number
    username: string
    firstName: string
    lastName: string
    bio: string
    profilePicture: string
}

const GetUserData = async (userID: number, query: Knex): Promise<GetUserDataType | null> => {
    return query
        .select(`ID`, `username`, `firstName`, `lastName`, `bio`, `profilePicture`)
        .from(`users`)
        .where(`ID`, userID)
        .then(userData => {
            return {
                id: userData[0].ID,
                username: userData[0].username,
                firstName: userData[0].firstName,
                lastName: userData[0].lastName,
                bio: userData[0].bio,
                profilePicture: userData[0].profilePicture,
            }
        })
        .catch(err => {
            console.error(err)

            return null
        })
}

export default GetUserData
