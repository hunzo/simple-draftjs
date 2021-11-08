import AuthApi from "./AuthApi"

const Login = (username: string) => {
    return AuthApi().get(`/auth/login/${username}`)
}



export {
    Login
}