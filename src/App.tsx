import React from 'react'
import './App.css'
import TextEdtor from './component/TextEditor'
import ToolBar from './component/ToolBar'

const App: React.FC = () => {
  return (
    <div className="App">
      <ToolBar />
      <TextEdtor />
    </div>
  )
}

export default App
