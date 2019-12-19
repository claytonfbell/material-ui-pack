import React from "react"
import Form from "../Form"
import SelectRegion from "../SelectRegion"

export default function SelectRegionExample() {
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
      <SelectRegion name="stateOrProvince" country="USA" />
    </Form>
  )
}
