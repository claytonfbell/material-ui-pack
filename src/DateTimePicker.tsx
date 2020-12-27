import MomentUtils from "@date-io/moment"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import {
  DateTimePicker as MUIDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { startCase } from "lodash"
import moment from "moment-timezone"
import React, { useMemo } from "react"
import { useForm } from "./FormProvider"
import { formatDateTime } from "./lib"

interface Props {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  timeZone?: string
}

export function DateTimePicker(props: Props) {
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
        ? moment(value || undefined).tz(props.timeZone)
        : moment(value || undefined),
    [props.timeZone, value]
  )

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
        <MuiPickersUtilsProvider utils={MomentUtils}>
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
              setValue(props.name, e === null ? null : e.toISOString(true))
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
