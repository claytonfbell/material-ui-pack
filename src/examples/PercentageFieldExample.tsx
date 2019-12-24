import React from "react"
import Form from "../Form"
import PercentageField from "../PercentageField"
import { Box } from "@material-ui/core"

export default function PercentageFieldExample() {
  const [state, setState] = React.useState({ taxRate: 0 })
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
        <PercentageField name="taxRate" decimals={3} />
      </Form>
    </Box>
  )
}
