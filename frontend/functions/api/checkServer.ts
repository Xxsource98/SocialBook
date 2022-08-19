import axios from 'axios'

const IsServerWorking = async () => {
    return axios
        .get(`${process.env.SERVER_CONTAINER_URL}:${process.env.SERVER_CONTAINER_PORT}`)
        .then(data => {
            return data.data ?? false
        })
        .catch(err => {
            console.error(err)
            return false
        })
}

export default IsServerWorking
