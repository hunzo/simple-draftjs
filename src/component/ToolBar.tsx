import PreviewModal from './PreviewModal'
import SendMail from './SendMail'
import './ToolBar.css'
import UploadFile from './UploadFile'
const ToolBar = () => {
    return (
        <div className="toolbar">
            <UploadFile />
            <PreviewModal />
            <SendMail />
        </div>
    )
}

export default ToolBar