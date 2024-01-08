/* eslint-disable import/no-extraneous-dependencies */
import { ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js/dist/Draft.css'
import { useState } from 'react'

export const MyEditor = () => {
  const contentStateT = ContentState.createFromText('Type here...')
  const raw = convertToRaw(contentStateT) // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw) // ContentState JSON

  console.log('contentState', contentState)

  return (
    <Editor
      defaultContentState={contentState}
      onContentStateChange={setContentState}
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
  )
}
