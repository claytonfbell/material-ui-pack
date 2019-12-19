import React from "react"
import Form from "../Form"
import SelectTimeZone from "../SelectTimeZone"

export default function SelectTimeZoneExample() {
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
      <SelectTimeZone name="timeZone" />
    </Form>
  )
}
