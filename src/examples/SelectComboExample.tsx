import React from "react"
import { Container, CssBaseline } from "@material-ui/core"
import Form from "../Form"
import SelectCombo from "../SelectCombo"

export default function SelectComboExample() {
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
        <SelectCombo
          options={[
            { value: "blue", label: "Blue" },
            { value: "red", label: "Red" },
          ]}
          name="favoriteColor"
        />
      </Form>
    </Container>
  )
}
