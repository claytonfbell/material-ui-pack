import React from "react"
import { Form, TextField, SubmitButton } from "material-ui-pack"

export function TextFieldExample() {
  const [state, setState] = React.useState({
    phone: "",
    password2: "",
    someText: "",
  })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      debug
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
      preventSubmitOnEnterKey
    >
      <TextField name="phone" phone />
      <TextField name="password2" password />
      <TextField name="someText" password rows={4} multiline />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
