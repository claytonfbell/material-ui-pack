import DayjsUtils from "@date-io/dayjs"
import {
  MuiPickersUtilsProvider,
  TimePicker as MUITimePicker,
} from "@material-ui/pickers"
import dayjs from "dayjs"
import startCase from "lodash/startCase"
import React from "react"
import { useForm } from "./FormProvider"

interface TimePickerProps {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
}
export function TimePicker(props: TimePickerProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()
  let value = getValue(props.name) as string | null
  if (value === undefined || value === null) {
    value = dayjs().format("HH:mm:ss")
  }
  value = `${dayjs().format("YYYY-MM-DD")} ${value}`

  const label = props.label === undefined ? startCase(props.name) : props.label

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
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
        onChange={(e) => {
          setValue(props.name, e === null ? null : e.format("HH:mm:00"))
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
