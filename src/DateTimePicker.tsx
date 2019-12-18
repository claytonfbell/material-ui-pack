import React from "react"
import { DateTimePicker as MUIDateTimePicker } from "@material-ui/pickers"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import startCase from "lodash/startCase"
import MomentUtils from "@date-io/moment"

import { useForm } from "./FormProvider"

interface DateTimePickerProps {
  name: string
  label?: string
  disabled?: boolean
}
function DateTimePicker(props: DateTimePickerProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()
  const value = getValue(props.name) as string | null

  const label = props.label === undefined ? startCase(props.name) : props.label

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MUIDateTimePicker
        fullWidth
        label={label}
        size={size}
        margin={margin}
        disabled={props.disabled || busy}
        inputVariant="outlined"
        value={value}
        format={"M/D/YYYY h:mm A"}
        onChange={e => {
          setValue(props.name, e === null ? null : e.toISOString())
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DateTimePicker
