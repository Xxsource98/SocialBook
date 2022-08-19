import express from 'express'
import path from 'path'
import fs from 'fs'
import { Knex } from 'knex'

const GetProfilePicture = async (req: express.Request, res: express.Response, query: Knex) => {
    const userid = req.params.userID

    const queryResult = await query
        .select(`profilePicture`)
        .where(`ID`, userid)
        .from(`users`)
        .then(userData => {
            if (userData.length > 0) {
                const profilePicture = path.join(__dirname, `../../../public/${userData[0].profilePicture}`)

                if (fs.existsSync(profilePicture)) {
                    return globalThis.ReturnData(200, path.join(__dirname, `../../../public/${userData[0].profilePicture}`))
                } else {
                    return globalThis.ReturnData(400, 'Invalid profile picture')
                }
            } else {
                return globalThis.ReturnData(400, 'Failed to fetch profile picture data')
            }
        })
        .catch(err => {
            return globalThis.ReturnData(500, err)
        })

    if (queryResult.code === 200) {
        res.status(200).sendFile(queryResult.description)
    } else {
        globalThis.SendPromiseData(res, queryResult)
    }
}

const SetProfilePicture = async (req: express.Request, res: express.Response, query: Knex) => {
    const { userData } = res.locals
    let profilePictureName: string | null = null

    await req.busboy.on('file', async (name, stream, info) => {
        if (name === 'avatar') {
            const currentProfilePicture = await query
                .select(`profilePicture`)
                .where(`username`, userData.username)
                .from(`users`)
                .then(data => data[0].profilePicture)

            const fileName = `${name}-${Date.now()}${path.extname(info.filename)}`
            const saveLocation = path.join(__dirname, '../../../public/') + fileName

            profilePictureName = fileName

            if (currentProfilePicture && currentProfilePicture !== 'default.png') {
                const removeLocation = path.join(__dirname, '../../../public/') + currentProfilePicture

                fs.unlink(removeLocation, err => {
                    if (err) console.error(err)
                })
            }

            stream.pipe(fs.createWriteStream(saveLocation))
        }
    })

    await req.busboy.on('finish', async () => {
        if (userData) {
            if (profilePictureName) {
                const queryResult = await query
                    .update({
                        profilePicture: profilePictureName,
                    })
                    .where(`id`, userData.id)
                    .from(`users`)
                    .then(userData => {
                        const success = userData === 1

                        if (success) {
                            return globalThis.ReturnData(200, 'Profile picture updated')
                        } else {
                            return globalThis.ReturnData(400, 'Invalid user')
                        }
                    })
                    .catch(err => {
                        return globalThis.ReturnData(500, err)
                    })

                globalThis.SendPromiseData(res, queryResult)
            } else {
                globalThis.SendData(res, 400, 'Picture field is empty')
            }
        } else {
            globalThis.SendData(res, 500)
        }
    })
}

export { GetProfilePicture, SetProfilePicture }
