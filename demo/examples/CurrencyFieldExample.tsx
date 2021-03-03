import Box from "@material-ui/core/Box"
import React from "react"
import { CurrencyField, Form } from "material-ui-pack"

export function CurrencyFieldExample() {
  const [state, setState] = React.useState({ price: 0.23 })
  const [busy, setBusy] = React.useState(false)
  return (
    <Box>
      <Form
        debug
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
      >
        <CurrencyField
          name="price"
          allowNegative
          numeric
          inPennies
          alignRight
          blankZero
          fulleWidth
        />
      </Form>
    </Box>
  )
}
