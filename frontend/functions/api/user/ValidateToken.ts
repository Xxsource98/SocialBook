import { GetServerSidePropsContext } from 'next'
import Cookies from 'cookies'

const ValidateToken = (ctx: GetServerSidePropsContext): string | null => {
    const cookies = new Cookies(ctx.req, ctx.res)
    const accessToken = cookies.get('socialbook_accessToken')

    return accessToken ?? null
}

export default ValidateToken
