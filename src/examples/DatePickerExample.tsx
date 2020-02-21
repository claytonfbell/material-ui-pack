import React from "react"
import DatePicker from "../DatePicker"
import Form from "../Form"

export default function DatePickerExample() {
  const [state, setState] = React.useState({ myDate: "1978-09-22" })
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
      <DatePicker name="myDate" />
    </Form>
  )
}
