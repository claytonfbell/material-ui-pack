import React from "react"
import {
  DateTimePicker,
  DateTimePickerBase,
  Form,
  FormFields,
  SelectTimeZone,
  TimePicker,
} from "material-ui-pack"
import { Box } from "@mui/material"

export function DateTimePickerExample() {
  const [state, setState] = React.useState({
    dateAndTime: "2020-06-23T20:36:51.673Z",
    dateAndTimeNull: null,
    dateAndTimeEmpty: "",
    timeZone: "America/Chicago",
    time: "23:33:00",
  })
  const [busy, setBusy] = React.useState(false)
  const [value, setValue] = React.useState<string | null>(null)
  return (
    <Box>
      <Form
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        debug
        schema={{
          dateAndTime: {
            type: "dateTime",
            clearable: false,
            timeZone: state.timeZone,
          },
        }}
        buttons={false}
      >
        <FormFields />
        <SelectTimeZone name="timeZone" />
        <DateTimePicker
          name="dateAndTimeNull"
          timeZone={state.timeZone}
          minuteIncrements={5}
        />
        <DateTimePicker name="dateAndTimeEmpty" timeZone={state.timeZone} />
        <TimePicker name="time" minuteIncrements={1} />
      </Form>
      <br />
      <br />
      <DateTimePickerBase
        id="custom-id"
        value={value}
        onChange={x => setValue(x)}
        name="baseClearable"
        clearable
        minuteIncrements={5}
      />
    </Box>
  )
}
