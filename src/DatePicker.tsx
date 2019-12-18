import React from "react"
import { DatePicker as MUIDatePicker } from "@material-ui/pickers"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import startCase from "lodash/startCase"
import MomentUtils from "@date-io/moment"

import { useForm } from "./FormProvider"

interface DatePickerProps {
  name: string
  label?: string
  disabled?: boolean
}
function DatePicker(props: DatePickerProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()
  const value = getValue(props.name) as string | null

  const label = props.label === undefined ? startCase(props.name) : props.label

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MUIDatePicker
        fullWidth
        label={label}
        size={size}
        margin={margin}
        disabled={props.disabled || busy}
        inputVariant="outlined"
        value={value}
        format={"M/D/YYYY"}
        onChange={e => {
          const newValue = e?.format("YYYY-MM-DD") || null
          setValue(props.name, newValue)
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
