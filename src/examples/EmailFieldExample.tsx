import React from "react"
import { EmailField, Form } from "../lib"

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
