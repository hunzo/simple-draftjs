import axios from "axios"

const Api = () => {
    const token = localStorage.getItem('token')

    if (!token) return axios.create({
        baseURL: 'http://localhost:8080'
    })

    return axios.create({
        // baseURL: `http://10.10.31.229:8080`
        baseURL: `http://localhost:8080`,
        headers: {
            'x-api-key': token,
            'content-type': 'application/json'
        }
    })
}

export default Api