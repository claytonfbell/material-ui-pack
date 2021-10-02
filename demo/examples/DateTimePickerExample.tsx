import React from "react"
import {
  DateTimePicker,
  DateTimePickerBase,
  Form,
  FormFields,
  SelectTimeZone,
} from "material-ui-pack"
import { Box } from "@mui/material"

export function DateTimePickerExample() {
  const [state, setState] = React.useState({
    dateAndTime: "2020-06-23T20:36:51.673Z",
    dateAndTimeNull: null,
    dateAndTimeEmpty: "",
    timeZone: "America/Chicago",
  })
  const [busy, setBusy] = React.useState(false)
  const [value, setValue] = React.useState<string | null>(null)
  return (
    <Box style={{ border: `1px solid red` }}>
      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
        debug
        schema={{
          dateAndTime: "dateTime",
        }}
        buttons={false}
      >
        <FormFields />
        <SelectTimeZone name="timeZone" />
        {/* <DateTimePicker name="dateAndTime" timeZone={state.timeZone} /> */}
        <DateTimePicker name="dateAndTimeNull" timeZone={state.timeZone} />
        <DateTimePicker name="dateAndTimeEmpty" timeZone={state.timeZone} />
      </Form>
      <br />
      <br />
      <DateTimePickerBase
        value={value}
        onChange={x => setValue(x)}
        name="baseClearable"
        clearable
      />
    </Box>
  )
}
