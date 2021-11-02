import axios from "axios"

const Api = () => {
    return axios.create({
        // baseURL: `http://10.10.31.229:8080`
        baseURL: `http://localhost:8080`
    })
}

export default Api