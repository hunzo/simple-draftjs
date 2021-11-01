import axios from "axios"

const Api = () => {
    return axios.create({
        baseURL: `http://localhost:8080`
    })
}

export default Api