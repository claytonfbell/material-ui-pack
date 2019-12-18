import React from "react"
import { TimePicker as MUITimePicker } from "@material-ui/pickers"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import startCase from "lodash/startCase"
import MomentUtils from "@date-io/moment"
import moment from "moment"

import { useForm } from "./FormProvider"

interface TimePickerProps {
  name: string
  label?: string
  disabled?: boolean
}
function TimePicker(props: TimePickerProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()
  let value = getValue(props.name) as string | null
  if (value === undefined || value === null) {
    value = moment().format("HH:mm:ss")
  }
  value = `${moment().format("YYYY-MM-DD")} ${value}`

  const label = props.label === undefined ? startCase(props.name) : props.label

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MUITimePicker
        fullWidth
        label={label}
        size={size}
        margin={margin}
        disabled={props.disabled || busy}
        inputVariant="outlined"
        value={value}
        format={"h:mm A"}
        onChange={e => {
          const newValue = e?.format("HH:mm:00") || null
          setValue(props.name, newValue)
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default TimePicker
