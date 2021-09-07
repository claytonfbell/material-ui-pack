import {
  Form,
  SelectCountry,
  SelectRegion,
  SelectTimeZone,
} from "material-ui-pack"
import React from "react"

export function SelectCountryExample() {
  const [state, setState] = React.useState({
    country: "US",
    stateOrProvince: "NY",
    timeZone: "America/New_York",
  })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
      debug
    >
      <SelectCountry
        name="country"
        isoType="isoAlpha2"
        required
        unitedStatesAndCanadaOnly
      />
      <SelectRegion
        name="stateOrProvince"
        country={state.country}
        countryIsoType="isoAlpha2"
        required
        fiftyStatesAndDC
      />
      <SelectTimeZone
        name="timeZone"
        country={state.country}
        countryIsoType="isoAlpha2"
        required
      />
    </Form>
  )
}
