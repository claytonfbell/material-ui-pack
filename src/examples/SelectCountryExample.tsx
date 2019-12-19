import React from "react"
import Form from "../Form"
import SelectCountry from "../SelectCountry"

export default function SelectCountryExample() {
  const [state, setState] = React.useState({ myInput: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
    >
      <SelectCountry name="country" />
    </Form>
  )
}
