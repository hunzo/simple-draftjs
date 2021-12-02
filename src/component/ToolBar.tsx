import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { useEditor } from '../editorContext'
import PreviewModal from './PreviewModal'
import SendMail from './SendMail'
import './ToolBar.css'
import UploadFile from './UploadFile'

const ToolBar = () => {
  const { editorState, setEditorState } = useEditor()
  const saveState = () => {
    const content = editorState.getCurrentContent()
    localStorage.setItem('draft', JSON.stringify(convertToRaw(content)))
  }

  const loadState = () => {
    const data = localStorage.getItem('draft')
    if (!data) return

    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(data)))
    )
  }
  return (
    <div className="toolbar">
      <UploadFile />
      <PreviewModal />
      <SendMail />
      <button onClick={saveState}>save</button>
      <button onClick={loadState}>load</button>
    </div>
  )
}

export default ToolBar

