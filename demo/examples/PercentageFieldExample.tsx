import { Box } from "@material-ui/core"
import React from "react"
import { Form, PercentageField } from "material-ui-pack"

export function PercentageFieldExample() {
  const [state, setState] = React.useState({ taxRate: 0 })
  const [busy, setBusy] = React.useState(false)
  return (
    <Box style={{ maxWidth: 200 }}>
      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
        debug
      >
        <PercentageField name="taxRate" decimals={3} />
      </Form>
    </Box>
  )
}
