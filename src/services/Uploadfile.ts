import Api from "./Api"

const Uploadfile = () => {
    return Api().post("/attachment/upload")
}

const ListFiles = () => {
    return Api().get('/attachment/list')
}


export {
    Uploadfile,
    ListFiles
}