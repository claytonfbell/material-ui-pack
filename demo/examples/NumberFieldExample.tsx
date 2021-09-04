import { Box } from "@material-ui/core"
import React from "react"
import { Debug, Form, NumberField, NumberFieldBase } from "material-ui-pack"

export function NumberFieldExample() {
  const [state, setState] = React.useState({ first: 0 })
  const [value, setValue] = React.useState(5)
  const [busy, setBusy] = React.useState(false)

  return (
    <Box>
      <Debug object={{ state, value }} />

      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
      >
        <NumberField name="first" fullWidth={false} decimals={2} />
      </Form>

      <br />
      <NumberFieldBase
        fullWidth={false}
        label={`NumberFieldBase ${value}`}
        value={value}
        onChange={newValue => setValue(newValue)}
        min={-5}
        max={200}
        setZeroToNull
        incrementBy={10}
      />
    </Box>
  )
}
