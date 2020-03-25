import MomentUtils from "@date-io/moment"
import {
  MuiPickersUtilsProvider,
  TimePicker as MUITimePicker,
} from "@material-ui/pickers"
import startCase from "lodash/startCase"
import moment from "moment"
import React from "react"
import { useForm } from "./FormProvider"

interface TimePickerProps {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
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
        required={props.required}
        inputVariant="outlined"
        value={value}
        format={"h:mm A"}
        onChange={e => {
          setValue(props.name, e === null ? null : e.format("HH:mm:00"))
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default TimePicker
