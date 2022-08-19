import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'

import IsServerWorking from '@functions/api/checkServer'
import ValidateUser from '@functions/api/user/ValidateUser'

type IsAuthedType = {
    loggedIn: boolean
    serverWorking: boolean
}

const IsAuthed = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<IsAuthedType> => {
    let validateResult = false
    let isServerWorking = false

    isServerWorking = await IsServerWorking().then(isWorking => {
        return isWorking
    })

    validateResult = await ValidateUser(context)
        .then(validateData => {
            return validateData?.data.status === 'Success' ?? false
        })
        .catch(err => {
            console.error(err)
            return false
        })

    return {
        loggedIn: validateResult,
        serverWorking: isServerWorking,
    }
}

export default IsAuthed
