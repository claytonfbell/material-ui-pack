import React, { useState, useEffect } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Typography, makeStyles } from "@material-ui/core"
import { stateToMarkdown } from "draft-js-export-markdown"
import { stateFromMarkdown } from "draft-js-import-markdown"
import _ from "lodash"

import { useForm } from "./FormProvider"

const TOOLBAR = {
  options: ["inline", "list", "history", "link"],
  inline: {
    options: ["bold", "italic", "underline", "monospace"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    "& .rdw-editor-toolbar": {
      border: 0,
    },
  },
  wrapper: {
    borderRadius: 3,
    boxShadow: "0 0 0 1px #c4c4c4",
    paddingTop: 10,
    marginTop: 7,
    "&.focus": {
      boxShadow: "0 0 0 2px " + theme.palette.primary.main,
    },
  },
  editor: {
    paddingLeft: 20,
    paddingRight: 20,
    borderTop: "1px solid #c4c4c4",
    minHeight: 100,
  },
  label: {
    position: "absolute",
    backgroundColor: theme.palette.background.default,
    paddingLeft: 4,
    paddingRight: 4,
    left: 10,
    top: -9,
    "&.focus": {
      color: theme.palette.primary.main,
    },
  },
}))

const TextEditor = ({
  name,
  label = undefined,
  required = false,
  placedOnWhite = false,
}) => {
  const { getValue, setValue } = useForm()
  let value = getValue(name)
  value = value === undefined ? "" : value
  label = label === undefined ? _.startCase(name) : label
  const classes = useStyles()
  const [hasFocus, setHasFocus] = useState(false)
  const [editorState, setEditorState] = useState(
    getEditorStateWithMarkdown(value)
  )
  const [charLength, setCharLength] = useState(0)
  useEffect(() => {
    setEditorState(getEditorStateWithMarkdown(value))
  }, [value])
  function getEditorStateWithMarkdown(md) {
    md = md === null ? "" : md
    const contentState = stateFromMarkdown(md)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }
  function onEditorStateChange(es) {
    setCharLength(stateToMarkdown(editorState.getCurrentContent()).length)
    setEditorState(es)
  }
  function handleFocus() {
    setHasFocus(true)
  }
  function handleBlur() {
    setHasFocus(false)
    const md = stateToMarkdown(editorState.getCurrentContent())
    setValue(name, md)
  }
  let focusCss = hasFocus ? " focus" : ""

  return (
    <div className={classes.root}>
      <Typography
        className={classes.label + focusCss}
        style={{ backgroundColor: placedOnWhite ? "white" : undefined }}
        variant="caption"
      >
        {label} {required && "*"}
        {charLength > 1000 ? ` (${charLength} characters)` : ""}
      </Typography>
      <Typography component="div">
        <Editor
          editorState={editorState}
          wrapperClassName={classes.wrapper + focusCss}
          editorClassName={classes.editor}
          onEditorStateChange={onEditorStateChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          toolbar={TOOLBAR}
        />
      </Typography>
    </div>
  )
}
export default TextEditor
