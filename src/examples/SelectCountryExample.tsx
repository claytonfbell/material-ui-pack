import React from "react"
import { Form, SelectCountry, SelectRegion, SelectTimeZone } from "../lib"

export default function SelectCountryExample() {
  const [state, setState] = React.useState({
    country: "",
    stateOrProvince: "",
    timeZone: "",
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
      <SelectCountry name="country" isoType="isoAlpha2" required />
      <SelectRegion
        name="stateOrProvince"
        country={state.country}
        countryIsoType="isoAlpha2"
        required
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
