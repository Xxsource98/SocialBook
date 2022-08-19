import axios from 'axios'
import Cookies from 'cookies'
import { GetServerSidePropsContext } from 'next'
import { deleteCookie, setCookie } from 'cookies-next'

export type ValidateUserType = {
    status: 'Success' | 'Failed'
    description: string
}

const ValidateUser = async (ctx: GetServerSidePropsContext) => {
    const cookies = new Cookies(ctx.req, ctx.res)
    const accessToken = cookies.get('socialbook_accessToken')
    const refreshToken = cookies.get('socialbook_refreshToken')

    if (accessToken === undefined) {
        return null
    }

    return axios
        .post(
            `${process.env.SERVER_CONTAINER_URL}:${process.env.SERVER_CONTAINER_PORT}/user/validate`,
            {
                refreshToken: refreshToken,
            },
            {
                headers: {
                    Authorization: accessToken,
                },
            }
        )
        .then(res => {
            const data = res.data

            if (data.status === 'Success') {
                if (data.tokens) {
                    setCookie('socialbook_accessToken', data.tokens.accessToken, {
                        req: ctx.req,
                        res: ctx.res,
                    })
                }
            }

            return {
                data: {
                    status: data.status,
                    description: data.description,
                },
            }
        })
        .catch(err => {
            deleteCookie('socialbook_accessToken', {
                req: ctx.req,
                res: ctx.res,
            })
            deleteCookie('socialbook_refreshToken', {
                req: ctx.req,
                res: ctx.res,
            })

            return err.code ?? "unknown"
        })
}

export default ValidateUser
