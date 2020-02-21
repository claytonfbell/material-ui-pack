import Box from "@material-ui/core/Box"
import React from "react"
import CurrencyField from "../CurrencyField"
import Form from "../Form"

export default function CurrencyFieldExample() {
  const [state, setState] = React.useState({ myInput: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Box style={{ maxWidth: 100 }}>
      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
      >
        <CurrencyField name="price" />
      </Form>
    </Box>
  )
}
