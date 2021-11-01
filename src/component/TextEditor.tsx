import {
    convertToRaw,
    DraftEditorCommand,
    Editor,
    EditorState,
    getDefaultKeyBinding,
    Modifier,
    RichUtils,
} from 'draft-js'
import { useEditor } from '../editorContext'
import { myBlockRenderer } from './BlockRenderer'
import './TextEditor.css'
const TextEdtor: React.FC = () => {
    const { editorState, setEditorState } = useEditor()

    const _handleKeyCommand = (command: DraftEditorCommand) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            setEditorState(newState)
            return 'handled'
        } else {
            return 'not-handled'
        }
    }

    const _handleKeyBindingFn = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab') {
            // const tabCharactor = '    '
            const tabCharactor = '\t'
            const newContentState = Modifier.replaceText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                tabCharactor
            )
            setEditorState(
                EditorState.push(
                    editorState,
                    newContentState,
                    'change-inline-style'
                )
            )
            return 'Tab'
        }
        return getDefaultKeyBinding(e)
    }
    return (
        <div className="wrap-editor">
            <div className="editor">
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    blockRendererFn={myBlockRenderer}
                    handleKeyCommand={_handleKeyCommand}
                    keyBindingFn={_handleKeyBindingFn}
                />
            </div>

            <pre className="preview">
                entityMap:
                {JSON.stringify(
                    convertToRaw(editorState.getCurrentContent()).entityMap,
                    null,
                    2
                )}
            </pre>
            <pre className="preview">
                blocks:
                {JSON.stringify(
                    convertToRaw(editorState.getCurrentContent()).blocks,
                    null,
                    2
                )}
            </pre>
        </div>
    )
}

export default TextEdtor
