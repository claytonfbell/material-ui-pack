import { Grid } from "@material-ui/core"
import {
  Form,
  Select,
  SelectCombo,
  SelectCountry,
  SelectRegion,
  SelectTimeZone,
} from "material-ui-pack"
import React, { useState } from "react"
import { DebugBox } from "./DebugBox"

export function SelectExample() {
  const [state, setState] = useState({
    selectOne: null,
    country: "NZ",
    region: null,
    timeZone: null,
    selectCombo: null,
  })

  return (
    <Form state={state} setState={setState} onSubmit={() => {}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DebugBox object={state} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            name="selectOne"
            options={["one", true, 1, 2, 3].map(value => ({
              value,
              label: String(value),
            }))}
            allowNull
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectCombo
            name="selectCombo"
            options={["one", "two", "three"].map(x => ({ value: x, label: x }))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectCountry name="country" isoType="isoAlpha2" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectRegion
            name="region"
            countryIsoType="isoAlpha2"
            country={state.country}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectTimeZone
            name="timeZone"
            countryIsoType="isoAlpha2"
            country={state.country}
          />
        </Grid>
      </Grid>
    </Form>
  )
}
