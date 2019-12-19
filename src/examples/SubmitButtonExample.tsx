import React from "react"
import Form from "../Form"
import SubmitButton from "../SubmitButton"

export default function SubmitButtonExample() {
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
