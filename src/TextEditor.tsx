import React from "react"
import { Checkbox, FormControlLabel, Box, Collapse } from "@material-ui/core"

import { RichTextEditor } from "./lib"
import TextField from "./TextField"

export interface TextEditorProps {
  name: string
  label?: string
  defaultRichEditor?: boolean
}
export default function TextEditor(props: TextEditorProps) {
  const [richEdit, setRichEdit] = React.useState(props.defaultRichEditor)

  return (
    <Box>
      <Box style={{ minHeight: 175 }}>
        <Collapse in={richEdit}>
          <RichTextEditor name={props.name} label={props.label} />
        </Collapse>
        <Collapse in={!richEdit}>
          <TextField
            rows={7}
            rowsMax={10}
            multiline
            name={props.name}
            label={props.label}
          />
        </Collapse>
      </Box>

      <FormControlLabel
        label="Use Rich Editor"
        control={
          <Checkbox
            checked={richEdit}
            onChange={e => setRichEdit(e.currentTarget.checked)}
          />
        }
      />
    </Box>
  )
}
