import Box from "@material-ui/core/Box"
import { CurrencyField, CurrencyFieldBase, Form } from "material-ui-pack"
import React from "react"

export function CurrencyFieldExample() {
  const [state, setState] = React.useState({ price: 0.23 })
  const [busy, setBusy] = React.useState(false)

  const [value, setValue] = React.useState(12.25)

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
          fullWidth
        />
      </Form>

      <CurrencyFieldBase
        label="CurrencyFieldBase"
        value={value}
        onChange={x => setValue(x as number)}
        inPennies
        numeric
        name="myformInput"
      />

      <CurrencyFieldBase
        label="CurrencyFieldBase2"
        numeric
        name="myformInput2"
      />
    </Box>
  )
}
