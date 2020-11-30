import DayjsUtils from "@date-io/dayjs"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import {
  DateTimePicker as MUIDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import startCase from "lodash/startCase"
import React, { useMemo } from "react"
import { useForm } from "./FormProvider"
import { formatDateTime } from "./lib"

dayjs.extend(timezone)
dayjs.extend(utc)

interface DateTimePickerProps {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  timeZone?: string
}
export function DateTimePicker(props: DateTimePickerProps) {
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

  const mom = useMemo(() => {
    if (props.timeZone !== undefined) {
      return dayjs(value || undefined).tz(props.timeZone)
    } else {
      return dayjs(value || undefined)
    }
  }, [props.timeZone, value])

  // this is a hack to reload the component if the timezone changes
  // the initial timezone appears to stick to the components state
  const [show, setShow] = React.useState<boolean>(false)
  React.useEffect(() => {
    setShow(false)
    const timer = setTimeout(() => {
      setShow(true)
    }, 1)
    return () => clearTimeout(timer)
  }, [mom])

  return (
    <>
      {show && (
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <MUIDateTimePicker
            required={props.required}
            fullWidth
            label={label}
            size={size}
            margin={margin}
            disabled={props.disabled || busy}
            inputVariant="outlined"
            value={mom}
            labelFunc={() => {
              if (value !== undefined && value !== null && value !== "") {
                return formatDateTime(mom.toISOString(), props.timeZone)
              } else {
                return ""
              }
            }}
            onChange={(e) => {
              setValue(props.name, e === null ? null : e.toISOString())
            }}
            InputProps={{
              endAdornment: <CalendarTodayIcon fontSize="inherit" />,
            }}
          />
        </MuiPickersUtilsProvider>
      )}
    </>
  )
}
