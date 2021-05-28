import { Box } from "@material-ui/core"
import React from "react"
import { Form, PercentageField, PercentageFieldBase } from "material-ui-pack"

export function PercentageFieldExample() {
  const [state, setState] = React.useState({ taxRate: 0 })
  const [busy, setBusy] = React.useState(false)

  const [value, setValue] = React.useState(0.075)
  return (
    <Box>
      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
        debug
      >
        <PercentageField name="taxRate" decimals={3} fullWidth={false} />
      </Form>

      <br />
      <PercentageFieldBase
        fullWidth
        label={`PercentageFieldBase ${value}`}
        value={value}
        onChange={newValue => setValue(newValue)}
        decimals={5}
      />
    </Box>
  )
}
