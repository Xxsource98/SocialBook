import Cookies from 'cookies'
import { GetServerSidePropsContext } from 'next'

const DestroyCookies = (ctx: GetServerSidePropsContext) => {
    const cookies = new Cookies(ctx.req, ctx.res)
    const accessToken = cookies.get('socialbook_accessToken')
    const refreshToken = cookies.get('socialbook_refreshToken')

    if (accessToken) {
        cookies.set('socialbook_accessToken', undefined)
    }

    if (refreshToken) {
        cookies.set('socialbook_refreshToken', undefined)
    }
}

export default DestroyCookies
