import React from "react"
import { Form, SubmitButton } from "../lib"

export function SubmitButtonExample() {
  const [state, setState] = React.useState({})
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
    >
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
