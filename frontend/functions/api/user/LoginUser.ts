import axios from 'axios'

const LoginUser = async (username: string, password: string) => {
    return axios
        .post(`${process.env.SERVER_URL}:${process.env.SERVER_PORT}/user/login`, {
            username: username,
            password: password,
        })
        .then(loginData => {
            return loginData.data
        })
}

export default LoginUser
