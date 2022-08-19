import jwt from 'jsonwebtoken'
import config from 'config'

type ElementType = string | object | Buffer

type ValidateType = {
    loggedIn: boolean
    error: jwt.VerifyErrors | null
    data: any
}

type JWTType = {
    accessToken: string
    refreshToken: string
}

class JWT {
    static Sign(Element: ElementType): JWTType {
        const accessJWT = jwt.sign(Element, config.get('JWT.jwtAccessToken'), {
            expiresIn: '3h',
        })

        const refreshJWT = jwt.sign(Element, config.get('JWT.jwtRefreshToken'), {
            expiresIn: '1y',
        })

        return {
            accessToken: accessJWT,
            refreshToken: refreshJWT,
        }
    }

    static Validate(Token: string | undefined, RefreshToken?: boolean): ValidateType {
        let data: ValidateType = {
            loggedIn: false,
            error: null,
            data: undefined,
        }

        if (Token) {
            jwt.verify(Token, config.get(RefreshToken ? 'JWT.jwtRefreshToken' : 'JWT.jwtAccessToken'), (err, userData) => {
                data = {
                    loggedIn: err === null && userData !== undefined,
                    error: err,
                    data: userData,
                }
            })
        }

        return data
    }

    static Authed(Token: string) {
        return this.Validate(Token).loggedIn
    }
}

export default JWT
