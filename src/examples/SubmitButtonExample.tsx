import React from "react"
import { Container, CssBaseline } from "@material-ui/core"
import Form from "../Form"
import SubmitButton from "../SubmitButton"

export default function SubmitButtonExample() {
  const [state, setState] = React.useState({})
  const [busy, setBusy] = React.useState(false)
  return (
    <Container maxWidth="xs" style={{ marginTop: 200 }}>
      <CssBaseline />
      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
      >
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Container>
  )
}
