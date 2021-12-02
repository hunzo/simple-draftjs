import { convertToHTML } from 'draft-convert'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { useEditor } from '../editorContext'
import { PostSendMail } from '../services/CallServices'

interface FilesAttachement {
  file_bytes: string
  file_content_type: string
  file_name: string
  isLinline: boolean
}

export interface EmailPayload {
  attach_files?: FilesAttachement[]
  to_recipient_list: string[]
  cc_recipient_list?: string[]
  subject: string
  content_html: string
}

const SendMail: React.FC = () => {
  const [modal, setModal] = useState(false)
  const { editorState } = useEditor()
  const html = convertToHTML({
    entityToHTML: (entity, text) => {
      if (entity.type === 'image:file') {
        const { file_name, width, cid, alignment } = entity.data
        return (
          <p style={{ textAlign: alignment }}>
            <img
              src={`cid:${cid}`}
              // src={cid}
              alt={file_name}
              width={width}
            />
          </p>
        )
      }
      if (entity.type === 'link') {
        const { url } = entity.data
        // console.log('convert link')
        return (
          <a rel="noreferrer noopener" target="_blank" href={url}>
            {text}
          </a>
        )
      }
    },
    blockToHTML: (block) => {
      if (block.type === 'unstyled') {
        return (
          <p
            style={{
              boxSizing: 'content-box',
              tabSize: 4,
              margin: '1px 0 1px 0',
              padding: '0',
              whiteSpace: 'pre-wrap',
            }}
          />
        )
      }
    },
  })(editorState.getCurrentContent())

  const SendEmailService = () => {
    const payload: EmailPayload = {
      to_recipient_list: ['recipient@email.address'],
      subject: 'Test from My Application',
      content_html: html,
      attach_files: [
        {
          file_bytes: 'SGVsbG8gV29ybGQh',
          file_content_type: 'text/pain',
          file_name: 'file2.txt',
          isLinline: false,
        },
      ],
    }
    PostSendMail(payload)
      .then((rs) => {
        alert('success')
      })
      .catch((e) => {
        alert('failed')
      })
  }

  return (
    <>
      <button onClick={() => setModal(true)} style={{ marginLeft: '.3rem' }}>
        Send mail
      </button>
      <Modal isOpen={modal} ariaHideApp={false}>
        <button onClick={() => setModal(false)}>close</button>
        <button onClick={SendEmailService}>Send Mail !!!</button>
        <p>
          <strong>Generate HTML and send to API</strong>
        </p>
        <div style={{ display: 'block', border: '1px solid #e1e1e1' }}>
          rawHTML:
          {JSON.stringify(html, null, 2)}
        </div>
      </Modal>
    </>
  )
}

export default SendMail
