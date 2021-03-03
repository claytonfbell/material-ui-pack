import React from "react"
import { DateTimePicker, Form, SelectTimeZone } from "material-ui-pack"

export function DateTimePickerExample() {
  const [state, setState] = React.useState({
    dateAndTime: "2020-06-23T20:36:51.673Z",
    dateAndTimeNull: null,
    dateAndTimeEmpty: "",
    timeZone: "America/Chicago",
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
      <SelectTimeZone name="timeZone" />
      <DateTimePicker name="dateAndTime" timeZone={state.timeZone} />
      <DateTimePicker name="dateAndTimeNull" timeZone={state.timeZone} />
      <DateTimePicker name="dateAndTimeEmpty" timeZone={state.timeZone} />
    </Form>
  )
}
