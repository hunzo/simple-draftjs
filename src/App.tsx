import React from 'react'
import './App.css'
import TextEdtor from './component/TextEditor'
import ToolBar from './component/ToolBar'
import { Login } from './services/Auth'
import { ListFiles } from './services/Uploadfile'

const App: React.FC = () => {
    const handleLogin = () => {
        Login('username')
            .then((rs) => {
                console.log(rs.data.token)
                localStorage.setItem('token', rs.data.token)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const handleListfiles = () => {
        ListFiles()
            .then((rs) => {
                console.log(rs.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className="App">
            <div className="test" style={{display: "flex", justifyContent: "flex-start"}}>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleListfiles}>listfile</button>
            </div>
            <ToolBar />
            <TextEdtor />
        </div>
    )
}

export default App
