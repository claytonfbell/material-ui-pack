import React from "react"
import { Snippet } from "./Snippet"

export function NumbersSnippet() {
  const codeString = `
  import { Grid } from "@mui/material"
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
      percentage1: 0.255,
      percentage2: 0.25,
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
            <PercentageField name="percentage1" decimals={3} />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <PercentageField name="percentage2" decimals={2} />
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
  
`
  return <Snippet>{codeString}</Snippet>
}
