import React from "react"
import { EmailField, Form } from "material-ui-pack"

export function EmailFieldExample() {
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
