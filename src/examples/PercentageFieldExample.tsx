import { Box, Tooltip } from "@material-ui/core"
import React from "react"
import Form from "../Form"
import PercentageField from "../PercentageField"

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
        <Tooltip title="it worked">
          <PercentageField name="taxRate" decimals={3} />
        </Tooltip>
      </Form>
    </Box>
  )
}
