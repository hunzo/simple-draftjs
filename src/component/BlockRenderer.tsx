import { ContentBlock, ContentState, EditorState, Modifier } from 'draft-js'
import './BlockRenderer.css'
import { ImageFileComponent, ImageURLComponent } from './ImagesComponent'

export interface BlockComponentProps {
    contentState: ContentState
    block: ContentBlock
}

export const myBlockRenderer = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType()
    if (type === 'atomic') {
        return {
            component: MediaComponent,
            editable: false,
        }
    }
}

export const MediaComponent: React.FC<BlockComponentProps> = (
    props: BlockComponentProps
) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0))
    let media = null

    switch (entity.getType()) {
        case 'image:file':
            // media = <SimpleImageComponent {...props} />
            media = <ImageFileComponent {...props} />
            break
        case 'image:url':
            media = <ImageURLComponent {...props} />
            break
        // ex. video, embended, link
        // case 'video':
        //     console.log('video case')
        //     break
        default:
            media = null
            break
    }

    return media
}

