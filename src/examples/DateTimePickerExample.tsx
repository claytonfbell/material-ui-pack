import React from "react"
import DateTimePicker from "../DateTimePicker"
import Form from "../Form"

export default function DateTimePickerExample() {
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
      <DateTimePicker name="dateAndTime" timeZone="America/Chicago" />
    </Form>
  )
}
