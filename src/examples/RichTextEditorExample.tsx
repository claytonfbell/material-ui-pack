import React from "react"
import { Form, RichTextEditor } from "../lib"

export function RichTextEditorExample() {
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
