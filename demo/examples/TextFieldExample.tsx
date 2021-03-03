import React from "react"
import { Form, TextField } from "material-ui-pack"

export function TextFieldExample() {
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
