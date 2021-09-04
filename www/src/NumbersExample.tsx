import { Grid } from "@material-ui/core"
import {
  CurrencyField,
  Form,
  NumberField,
  PercentageField,
} from "material-ui-pack"
import React, { useState } from "react"
import { DebugBox } from "./DebugBox"

export function NumbersExample() {
  const [state, setState] = useState({
    percentageField: 0.255,
    currencyField: 9.99,
    numberField: 2,
  })

  const [busy, setBusy] = useState(false)

  return (
    <Form
      state={state}
      setState={setState}
      busy={busy}
      onSubmit={() => setBusy(true)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DebugBox object={state} />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <PercentageField name="percentageField" decimals={3} />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <CurrencyField name="currencyField" />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <NumberField name="numberField" incrementBy={1} min={-5} max={50} />
        </Grid>
      </Grid>
    </Form>
  )
}
