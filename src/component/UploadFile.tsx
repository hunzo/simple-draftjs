import { AtomicBlockUtils, convertToRaw, EditorState } from 'draft-js'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useEditor } from '../editorContext'
import './UploadFile.css'

export interface ImagesReader {
    file_name?: string
    file_size?: number
    file_type?: string
    src: string
    width: number
    alignment: string
    content_id?: string
    file_content_type?: string
    isInline?: boolean
    file_bytes?: string
}

export interface AttFile {
    file_name: string
    file_content_type: string
    file_bytes: string
    content_id: string
    isInline: boolean
}

const UploadFile: React.FC = () => {
    const { editorState, setEditorState } = useEditor()
    const [fileUpload, setFileUpload] = useState<AttFile[]>([])

    useEffect(() => {
        // console.log(fileUpload)
        localStorage.setItem('attachements', JSON.stringify(fileUpload))
    }, [fileUpload])

    const saveEntity = () => {
        const files = convertToRaw(editorState.getCurrentContent()).entityMap
        localStorage.setItem('entity', JSON.stringify(files))
    }

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const file = e.target.files![0]
        const reader = new FileReader()

        reader.onload = () => {
            const image: ImagesReader = {
                file_name: file.name,
                file_type: file.type,
                file_size: file.size,
                src: reader.result as string,
                width: 450,
                alignment: 'center',
                content_id: '_' + Math.random().toString(36).substr(2, 9),
                file_content_type: file.type,
                isInline: true,
                file_bytes: ""
            }
            const attFile: AttFile = {
                file_name: file.name,
                file_content_type: file.type,
                file_bytes: (reader.result as string).split(`data:${file.type};base64,`)[1],
                content_id: image.content_id as string,
                isInline: true
            }
            setFileUpload([...fileUpload, attFile])
            const constentStateWithEntity = editorState
                .getCurrentContent()
                .createEntity('image:file', 'IMMUTABLE', image)

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

    const handleInsertImageURL = () => {
        const src = prompt('please insert image link')
        if (!src) {
            alert('please insert image URL')
            return
        }
        const image: ImagesReader = {
            src: src,
            width: 450,
            alignment: 'center',
        }

        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity(
            'image:url',
            'IMMUTABLE',
            image
        )

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        })

        setEditorState(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
        )
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
            <button
                onMouseDown={(e) => {
                    e.preventDefault()
                    handleInsertImageURL()
                }}
            >
                Image URL
            </button>
            <button
                onMouseDown={(e) => {
                    e.preventDefault()
                    saveEntity()
                }}
            >
                Save to Localstorage
            </button>
        </div>
    )
}

export default UploadFile
