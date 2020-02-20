import React from "react"
import Form from "../Form"
import SelectCountry from "../SelectCountry"
import SelectRegion from "../SelectRegion"
import SelectTimeZone from "../SelectTimeZone"

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
      <SelectCountry name="country" isoType="isoAlpha2" />
      <SelectRegion
        name="stateOrProvince"
        country={state.country}
        countryIsoType="isoAlpha2"
      />
      <SelectTimeZone
        name="timeZone"
        country={state.country}
        countryIsoType="isoAlpha2"
      />
    </Form>
  )
}
