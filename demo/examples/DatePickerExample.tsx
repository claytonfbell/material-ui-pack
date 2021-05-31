import React from "react"
import { DatePicker, DatePickerBase, Form } from "material-ui-pack"

export function DatePickerExample() {
  const [state, setState] = React.useState({
    myDate: "1978-09-22",
    myClearableDate: null,
  })
  const [busy, setBusy] = React.useState(false)

  const [value, setValue] = React.useState<string | null>(null)

  return (
    <>
      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
        debug
      >
        <DatePicker name="myDate" />
        <DatePicker name="myClearableDate" clearable />
      </Form>
      <br />
      <br />
      <DatePickerBase
        clearable
        debugNamedInput
        name="base"
        value={value}
        onChange={x => setValue(x)}
      />
    </>
  )
}
