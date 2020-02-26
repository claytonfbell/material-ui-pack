import MomentUtils from "@date-io/moment"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import {
  DateTimePicker as MUIDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import startCase from "lodash/startCase"
import moment from "moment-timezone"
import React, { useMemo } from "react"
import { useForm } from "./FormProvider"

interface DateTimePickerProps {
  name: string
  label?: string
  disabled?: boolean
  timeZone?: string
}
function DateTimePicker(props: DateTimePickerProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()
  const value = React.useMemo(() => getValue(props.name) as string | null, [
    getValue,
    props.name,
  ])

  const label = props.label === undefined ? startCase(props.name) : props.label

  const mom = useMemo(
    () =>
      props.timeZone !== undefined
        ? moment(value as string).tz(props.timeZone)
        : moment(value as string),
    [props.timeZone, value]
  )
  console.log(props.timeZone)

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MUIDateTimePicker
        fullWidth
        label={label}
        size={size}
        margin={margin}
        disabled={props.disabled || busy}
        inputVariant="outlined"
        value={mom}
        format={"lll z"}
        onChange={e => {
          setValue(props.name, e === null ? null : e.toISOString())
        }}
        InputProps={{
          endAdornment: <CalendarTodayIcon fontSize="inherit" />,
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DateTimePicker
