import {
    ContentBlock,
    ContentState,
    EditorState,
    Modifier,
    SelectionState,
} from 'draft-js'
import { CSSProperties, useState } from 'react'
import { useEditor } from '../editorContext'
import { BlockComponentProps } from './BlockRenderer'

const SimpleImageComponent: React.FC<BlockComponentProps> = (
    props: BlockComponentProps
) => {
    const { editorState, setEditorState } = useEditor()
    const entity = props.contentState.getEntity(props.block.getEntityAt(0))

    const { file_content_base64, width, file_name, alignment } =
        entity.getData()
    const styled: CSSProperties = {
        textAlign: alignment,
    }
    const deleteImage = (block: ContentBlock) => {
        console.log('delete')
        const contentState = editorState.getCurrentContent()
        const key = block.getKey()
        console.log(key)

        const selection = editorState.getSelection()
        const selectionOfAtomicBlock = selection.merge({
            anchorKey: key,
            anchorOffset: 0,
            focusKey: key,
            focusOffset: block.getLength(),
        })

        const contentStateWithoutEntity = Modifier.applyEntity(
            contentState,
            selectionOfAtomicBlock,
            null
        )
        const editorStateWithoutEntity = EditorState.push(
            editorState,
            contentStateWithoutEntity,
            'apply-entity'
        )

        const contentStateWithoutBlock = Modifier.removeRange(
            contentStateWithoutEntity,
            selectionOfAtomicBlock,
            'backward'
        )
        const newEditorState = EditorState.push(
            editorStateWithoutEntity,
            contentStateWithoutBlock,
            'remove-range'
        )
        setEditorState(newEditorState)
    }
    return (
        <div style={styled}>
            <img
                className="image"
                src={file_content_base64}
                width={width}
                alt={file_name}
            />
            {/* <button onClick={() => {
                deleteImage
            }}>x</button> */}
        </div>
    )
}

// #debug
//render image with editor #error state
const ImageFileComponent: React.FC<BlockComponentProps> = (
    props: BlockComponentProps
) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0))
    const { editorState, setEditorState } = useEditor()

    const { src, width, file_name, file_size, file_type, alignment } =
        entity.getData()

    const [imgSize, setImgSize] = useState<number>(width)
    const [hover, setHover] = useState(false)
    const [imgAlingment, setImgAlignment] = useState(alignment)

    const info = `file_name: ${file_name} file_size: ${file_size} file_type: ${file_type}`

    const deleteImage = () => {
        console.log(props.block.getKey())
        const contentState = editorState.getCurrentContent()
        // console.log(contentState.getAllEntities().toJS())
        const key = props.block.getKey()

        const selection = editorState.getSelection()
        const selectionOfAtomicBlock = selection.merge({
            anchorKey: key,
            anchorOffset: 0,
            focusKey: key,
            focusOffset: props.block.getLength(),
        })
        // console.log(selectionOfAtomicBlock.toJS())
        const contentStateWithoutEntity = Modifier.applyEntity(
            contentState,
            selectionOfAtomicBlock,
            null
        )
        // console.log(contentStateWithoutEntity.toJS())
        const editorStateWithoutEntity = EditorState.push(
            editorState,
            contentStateWithoutEntity,
            'apply-entity'
        )
        // console.log(editorStateWithoutEntity.toJS())
        const contentStateWithoutBlock = Modifier.removeRange(
            contentStateWithoutEntity,
            selectionOfAtomicBlock,
            'backward'
        )
        console.log(contentStateWithoutBlock.toJS())
        // setEditorState(
        //     EditorState.push(
        //         editorStateWithoutEntity,
        //         contentStateWithoutBlock,
        //         'remove-range'
        //     )
        // )
    }

    // const deleteImage = () => {
    //     console.log('delete')
    //     const key = props.block.getKey()
    //     const selection = editorState.getSelection()
    //     const selectionOfAtomicBlock = selection.merge({
    //         anchorKey: key,
    //         anchorOffset: 0,
    //         focusKey: key,
    //         focusOffset: props.block.getLength(),
    //     })
    //     // console.log(contentState.getEntity)
    //     console.log(key)
    //     console.log(selection)
    //     console.log(selectionOfAtomicBlock)
    //     const contentStateWithoutEntity = Modifier.applyEntity(
    //         props.contentState,
    //         selectionOfAtomicBlock,
    //         null
    //     )
    //     console.log(contentStateWithoutEntity)
    //     const editorStateWithoutEntity = EditorState.push(
    //         editorState,
    //         contentStateWithoutEntity,
    //         'apply-entity'
    //     )
    //     console.log(editorStateWithoutEntity)
    //     const contentStateWithoutBlock = Modifier.removeRange(
    //         contentStateWithoutEntity,
    //         selectionOfAtomicBlock,
    //         'backward'
    //     )
    //     console.log(contentStateWithoutBlock)
    //     const newEditorState =  EditorState.push(editorStateWithoutEntity, contentStateWithoutBlock, "remove-range")
    //     setEditorState(newEditorState)
    // }

    const setAlignment = (alignment: string) => {
        // set for state
        const entityKey = props.block.getEntityAt(0)
        props.contentState.mergeEntityData(entityKey, { alignment })
        setEditorState(
            EditorState.forceSelection(editorState, editorState.getSelection())
        )
        //set for renderer
        setImgAlignment(alignment)
    }

    const setSize = (size: number) => {
        //set for State
        const entityKey = props.block.getEntityAt(0)
        props.contentState.mergeEntityData(entityKey, { width: size })
        setEditorState(
            EditorState.forceSelection(editorState, editorState.getSelection())
        )
        //set for renderer
        setImgSize(size)
    }

    const styled: CSSProperties = {
        textAlign: imgAlingment,
    }

    return (
        <div
            className="box"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div style={styled}>
                <img className="image" src={src} width={imgSize} alt={info} />
            </div>
            {hover ? (
                <div className="wrap-editor">
                    <div className="img-editor">
                        <button
                            className="img-editor-btn"
                            onClick={() => setAlignment('left')}
                        >
                            L
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={() => setAlignment('center')}
                        >
                            C
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={() => setAlignment('right')}
                        >
                            R
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={() => setSize(imgSize + 10)}
                        >
                            +
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={() => setSize(imgSize - 10)}
                        >
                            -
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={deleteImage}
                        >
                            x
                        </button>
                        <span className="img-info">
                            imgsize: {imgSize}px alignment: {alignment}
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

const ImageURLComponent: React.FC<BlockComponentProps> = (
    props: BlockComponentProps
) => {
    const entity = props.contentState?.getEntity(props.block.getEntityAt(0))
    const { editorState, setEditorState } = useEditor()

    const { src, width, alignment } = entity.getData()

    const [imgSize, setImgSize] = useState<number>(width)
    const [hover, setHover] = useState(false)
    const [imgAlingment, setImgAlignment] = useState(alignment)

    const info = src

    const setAlignment = (alignment: string) => {
        // set for state
        const entityKey = props.block.getEntityAt(0)
        props.contentState.mergeEntityData(entityKey, { alignment })
        setEditorState(
            EditorState.forceSelection(editorState, editorState.getSelection())
        )
        //set for renderer
        setImgAlignment(alignment)
    }

    const setSize = (size: number) => {
        //set for State
        const entityKey = props.block.getEntityAt(0)
        props.contentState.mergeEntityData(entityKey, { width: size })
        setEditorState(
            EditorState.forceSelection(editorState, editorState.getSelection())
        )
        //set for renderer
        setImgSize(size)
    }

    const styled: CSSProperties = {
        textAlign: imgAlingment,
    }

    return (
        <div
            className="box"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div style={styled}>
                <a href={src}>
                    <img
                        className="image"
                        src={src}
                        width={imgSize}
                        alt={info}
                    />
                </a>
            </div>
            {hover ? (
                <div className="wrap-editor">
                    <div className="img-editor">
                        <button
                            className="img-editor-btn"
                            onClick={() => setAlignment('left')}
                        >
                            L
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={() => setAlignment('center')}
                        >
                            C
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={() => setAlignment('right')}
                        >
                            R
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={() => setSize(imgSize + 10)}
                        >
                            +
                        </button>
                        <button
                            className="img-editor-btn"
                            onClick={() => setSize(imgSize - 10)}
                        >
                            -
                        </button>
                        <span className="img-info">
                            imgsize: {imgSize}px alignment: {alignment}
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export { ImageFileComponent, ImageURLComponent }
