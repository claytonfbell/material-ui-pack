import MomentUtils from "@date-io/moment"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import {
  DatePicker as MUIDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import startCase from "lodash/startCase"
import moment from "moment"
import React from "react"
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
  const mom = React.useMemo(() => moment(value as string), [value])
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
        value={mom}
        format={"LL"}
        onChange={e => {
          setValue(props.name, e === null ? null : e.format("YYYY-MM-DD"))
        }}
        InputProps={{
          endAdornment: <CalendarTodayIcon fontSize="inherit" />,
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
