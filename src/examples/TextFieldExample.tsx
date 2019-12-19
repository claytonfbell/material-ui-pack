import React from "react"
import { Container, CssBaseline } from "@material-ui/core"
import Form from "../Form"
import TextField from "../TextField"

export default function TextFieldExample() {
  const [state, setState] = React.useState({ myInput: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Container maxWidth="xs" style={{ marginTop: 200 }}>
      <CssBaseline />
      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
      >
        <TextField name="phone" phone />
      </Form>
    </Container>
  )
}
