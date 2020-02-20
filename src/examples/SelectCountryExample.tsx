import React from "react"
import Form from "../Form"
import SelectCountry from "../SelectCountry"
import SelectRegion from "../SelectRegion"

export default function SelectCountryExample() {
  const [state, setState] = React.useState({ country: "", stateOrProvince: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
    >
      <SelectCountry name="country" isoType="isoAlpha2" />
      <SelectRegion
        name="stateOrProvince"
        country={state.country}
        countryIsoType="isoAlpha2"
      />
    </Form>
  )
}
