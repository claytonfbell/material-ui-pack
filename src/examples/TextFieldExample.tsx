import React from "react"
import { Form } from "../lib"
import { TextField } from "../TextField"

export default function TextFieldExample() {
  const [state, setState] = React.useState({ phone: "", password2: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      debug
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
    >
      <TextField name="phone" phone />
      <TextField name="password2" password />
    </Form>
  )
}
