import axios from 'axios'

const RegisterUser = async (username: string, password: string, email: string, fName: string, lName: string) => {
    return axios
        .post(`${process.env.SERVER_URL}:${process.env.SERVER_PORT}/user/register`, {
            username: username,
            password: password,
            email: email,
            firstName: fName,
            lastName: lName,
        })
        .then(loginData => {
            return loginData.data
        })
}

export default RegisterUser
