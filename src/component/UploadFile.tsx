import { AtomicBlockUtils, EditorState } from 'draft-js'
import React, { ChangeEvent } from 'react'
import { useEditor } from '../editorContext'
import './UploadFile.css'

interface ImagesReader {
    file_name: string
    file_size: number
    file_type: string
    file_content_base64: string
    width: number
    alignment: string
}

const UploadFile: React.FC = () => {
    const { editorState, setEditorState } = useEditor()

    // const insertImage = (image: ImagesReader) => {
    //     const contentState = editorState.getCurrentContent()
    //     const contentStateWithEntity = contentState.createEntity(
    //         'image',
    //         'IMMUTABLE',
    //         image
    //     )
    //     const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    //     console.log(entityKey)
    //     const newEditorState = EditorState.set(editorState, {
    //         currentContent: contentStateWithEntity,
    //     })
    //     return AtomicBlockUtils.insertAtomicBlock(
    //         newEditorState,
    //         entityKey,
    //         ' '
    //     )
    // }

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const file = e.target.files![0]
        const reader = new FileReader()

        reader.onload = () => {
            const image: ImagesReader = {
                file_name: file.name,
                file_type: file.type,
                file_size: file.size,
                file_content_base64: reader.result as string,
                width: 450,
                alignment: 'center',
            }
            const constentStateWithEntity = editorState
                .getCurrentContent()
                .createEntity('image', 'IMMUTABLE', image)

            setEditorState(
                AtomicBlockUtils.insertAtomicBlock(
                    EditorState.set(editorState, {
                        currentContent: constentStateWithEntity,
                    }),
                    constentStateWithEntity.getLastCreatedEntityKey(),
                    ' '
                )
            )
        }

        reader.readAsDataURL(e.target.files[0])

        e.target.value = ''
    }

    return (
        <div className="uploadfile">
            <input
                id="upload"
                type="file"
                style={{ display: 'none' }}
                accept="image/png,image/jpeg,image/jpg,image/gif"
                onChange={handleUpload}
            />
            <button
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    document.getElementById('upload')?.click()
                }}
            >
                Upload Photo
            </button>
        </div>
    )
}

export default UploadFile
