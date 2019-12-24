import React from "react"
import Form from "../Form"
import EmailField from "../EmailField"

export default function EmailFieldExample() {
  const [state, setState] = React.useState({ email: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
    >
      <EmailField name="email" />
    </Form>
  )
}
