import React from "react"
import Form from "../Form"
import RichTextEditor from "../RichTextEditor"

export default function RichTextEditorExample() {
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
      <RichTextEditor name="markdownText" />
    </Form>
  )
}
