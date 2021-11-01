import { EmailPayload } from "../component/SendMail"
import Api from "./Api"

const PostSendMail = (payload: EmailPayload) => {
    return Api().post('/email/sendmail', payload)
}

export {
    PostSendMail
}