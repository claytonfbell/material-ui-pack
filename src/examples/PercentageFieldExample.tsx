import { Box, Tooltip } from "@material-ui/core"
import React from "react"
import { Form, PercentageField } from "../lib"

export default function PercentageFieldExample() {
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
        <Tooltip title="it worked">
          <PercentageField name="taxRate" decimals={3} />
        </Tooltip>
      </Form>
    </Box>
  )
}
