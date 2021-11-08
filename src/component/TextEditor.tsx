import {
    convertToRaw,
    DraftEditorCommand,
    Editor,
    EditorState,
    getDefaultKeyBinding,
    Modifier,
    RichUtils,
} from 'draft-js'
import { useCallback, useRef } from 'react'
import { useEditor } from '../editorContext'
import { myBlockRenderer } from './BlockRenderer'
import './TextEditor.css'
const TextEdtor: React.FC = () => {
    const { editorState, setEditorState } = useEditor()
    const editor = useRef<Editor>(null)
    const focusEditor = useCallback(() => {
        if (editor.current) {
            // console.log('in Focus: ', editorState.getCurrentContent().toJS())
            editor.current.focus()
        }
    }, [editor])
    // }, [editor, editorState])

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
        // console.log(e.key)
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

        if (e.key === 'Backspace') {
            console.log('Hey Backspace')
            var selectionState = editorState.getSelection()
            var anchorKey = selectionState.getAnchorKey()
            var currentContent = editorState.getCurrentContent()
            var currentContentBlock = currentContent.getBlockForKey(anchorKey)
            console.log(currentContentBlock.getType())
            console.log(anchorKey)
            // var start = selectionState.getStartOffset()
            // var end = selectionState.getEndOffset()
            // var selectedText = currentContentBlock.getText().slice(start, end)
        }
        return getDefaultKeyBinding(e)
    }
    return (
        <div className="wrap-editor" onClick={focusEditor}>
            <div className="editor">
                <Editor
                    ref={editor}
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
