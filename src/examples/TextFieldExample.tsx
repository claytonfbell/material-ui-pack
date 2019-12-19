import React from "react"
import Form from "../Form"
import TextField from "../TextField"

export default function TextFieldExample() {
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
      <TextField name="phone" phone />
    </Form>
  )
}
