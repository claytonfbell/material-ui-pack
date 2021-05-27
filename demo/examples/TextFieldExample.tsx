import { Form, SubmitButton, TextField, TextFieldBase } from "material-ui-pack"
import React from "react"

export function TextFieldExample() {
  const [state, setState] = React.useState({
    phone: "",
    password2: "",
    password3: "",
    someText: "",
  })
  const [busy, setBusy] = React.useState(false)

  const [value, setValue] = React.useState("")

  return (
    <>
      <Form
        debug
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
        preventSubmitOnEnterKey
      >
        <TextField name="phone" formatter="phone" />
        <TextField name="password2" formatter="password" />
        <TextField name="password3" formatter="newPassword" />
        <TextField name="someText" rows={4} multiline />
        <SubmitButton>Submit</SubmitButton>
      </Form>
      <br />
      <br />
      <TextFieldBase
        value={value}
        onChange={newValue => setValue(newValue)}
        formatter="phone"
        name="TextFieldBase"
      />
    </>
  )
}
