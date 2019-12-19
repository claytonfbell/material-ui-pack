import React from "react"
import Form from "../Form"
import TextEditor from "../TextEditor"

export default function TextEditorExample() {
  const [state, setState] = React.useState({ myInput: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
    >
      <TextEditor name="markdownText" />
    </Form>
  )
}
