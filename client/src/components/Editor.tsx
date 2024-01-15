/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import DOMPurify from 'dompurify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js/dist/Draft.css'

export const MyEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [convertedInHTMLContent, setConvertedInHTMLContent] = useState<TrustedHTML | string>('')

  const blocksFromHtml = htmlToDraft('<span style="font-size: 18px">Type here...</span>') // TODO - only for test / instesd api request
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentStateFromHTML = ContentState.createFromBlockArray(contentBlocks, entityMap)
  const editorStateInitial = EditorState.createWithContent(contentStateFromHTML)

  useEffect(() => {
    // TODO - only for test / instesd api request
    setEditorState(editorStateInitial)
  }, [])

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const html = draftToHtml(rawContentState)
    const cleanHTML = DOMPurify.sanitize(html) // XSS sanitizer for HTML,
    setConvertedInHTMLContent(cleanHTML)
  }, [editorState])

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: convertedInHTMLContent }} />
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          //  remove some default toolbar option
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </>
  )
}
