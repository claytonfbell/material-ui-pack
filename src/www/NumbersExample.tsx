import Grid from "@mui/material/Grid"
import {
  CurrencyField,
  Form,
  NumberField,
  PercentageField,
} from "../index-package"
import React, { useState } from "react"
import { DebugBox } from "./DebugBox"
import Stack from "@mui/material/Stack"

export function NumbersExample() {
  const [state, setState] = useState({
    percentage1: 0.255,
    percentage2: 0.25,
    percentage3: 0.25,
    currencyField1: 1.99,
    currencyField2: 2.99,
    currencyField3: 3.99,
    currencyField4: 4.99,
    pennies: 999,
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
          <Stack spacing={1}>
            <PercentageField name="percentage2" decimals={2} />
            <PercentageField name="percentage1" decimals={3} allowNegative />
            <PercentageField name="percentage3" decimals={4} />
          </Stack>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Stack spacing={1}>
            <CurrencyField name="currencyField1" currency="USD" />
            <CurrencyField name="currencyField2" autoDecimal currency="EUR" />
            <CurrencyField name="currencyField3" allowNegative currency="JPY" />
            <CurrencyField name="currencyField4" allowNegative autoDecimal />
            <CurrencyField
              name="pennies"
              allowNegative
              inPennies
              currency="USD"
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <NumberField name="numberField" incrementBy={1} min={-5} max={50} />
        </Grid>
      </Grid>
    </Form>
  )
}
