import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from "../styles/style.module.scss"
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import Label from "../../../ui/Label"

export default function TextEditor({value, onChange, activeTab}) {
    const [editorState, setEditorState] = useState(value ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(value))) : EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        let contentState = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        onChange(contentState)
    }

    const path = process.env.PUBLIC_URL + '/icons/TextEditor/'

    useEffect(() => {
        if(value)
            setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(value))))
    }, [activeTab])

    return (
        <div>
            <Label>Content*</Label>
            <Editor
                placeholder={"Please add text here"}
                wrapperClassName={styles.wrapper}
                editorClassName={styles.editor}
                toolbarClassName={styles.toolbar}
                editorState={editorState}
                onEditorStateChange={(editorState) => onEditorStateChange(editorState)}
                toolbar={{
                    options: ['blockType', 'inline', 'textAlign', 'list'],
                    blockType: {
                        inDropdown: false,
                        className: styles.block,
                        options: ['H1', 'H2', 'Normal'],

                    },
                    inline: {
                        inDropdown: false,
                        className: styles.block,
                        options: ['bold', 'italic', 'underline'],
                        bold: { className: styles.button, icon: path + 'bold.svg' },
                        italic: { className: styles.button, icon: path + 'italic.svg' },
                        underline: { className: styles.button, icon: path + 'underline.svg' }
                    },
                    textAlign: {
                        inDropdown: false,
                        className: styles.block,
                        options: ['left', 'center', 'right'],
                        left: { className: styles.button, icon: path + 'left.svg' },
                        center: { className: styles.button, icon: path + 'center.svg' },
                        right: { className: styles.button, icon: path + 'right.svg' }
                    },
                    list: {
                        inDropdown: false,
                        className: styles.block,
                        options: ['unordered', 'ordered'],
                        unordered: { className: styles.button, icon: path + 'unordered.svg' },
                        ordered: { className: styles.button, icon: path + 'ordered.svg' }
                    }
                }}
            />
        </div>
    )
}