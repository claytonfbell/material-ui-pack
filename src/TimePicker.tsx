import MomentUtils from "@date-io/moment"
import {
  MuiPickersUtilsProvider,
  TimePicker as MUITimePicker,
} from "@material-ui/pickers"
import { startCase } from "lodash"
import moment from "moment-timezone"
import React from "react"
import { useForm } from "./FormProvider"

interface Props {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
}
export function TimePicker(props: Props) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm<any>()
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
