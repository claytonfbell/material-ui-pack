import MomentUtils from "@date-io/moment"
import { IconButton, PropTypes } from "@material-ui/core"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import CloseIcon from "@material-ui/icons/Close"
import {
  DateTimePicker as MUIDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import { startCase } from "lodash"
import moment from "moment-timezone"
import React from "react"
import { useHandleState } from "./hooks/useHandleState"
import { formatDateTime } from "./util/formatDateTime"

type Value = string | null
type OnChange = (newValue: Value) => void

export interface DateTimePickerBaseProps {
  value?: Value
  onChange?: OnChange
  name?: string
  label?: string
  disabled?: boolean
  clearable?: boolean
  required?: boolean
  timeZone?: string
  margin?: PropTypes.Margin
  size?: "medium" | "small"
  debugNamedInput?: boolean
}

export const DateTimePickerBase = React.forwardRef<
  HTMLDivElement,
  DateTimePickerBaseProps
>(({ value: propsValue, onChange: propsOnChange, ...props }, ref) => {
  // manage state if no value and onChange
  const [state, setState] = React.useState<Value>(null)
  const value = propsValue !== undefined ? propsValue : state
  const onChange: OnChange =
    propsOnChange !== undefined ? propsOnChange : x => setState(x)

  const label = props.label === undefined ? startCase(props.name) : props.label

  const dateTime = React.useMemo(
    () =>
      value === null
        ? null
        : props.timeZone !== undefined
        ? moment(value || undefined).tz(props.timeZone)
        : moment(value || undefined),
    [value]
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
  }, [dateTime])

  // control open state when clearable
  const handleClear = () => onChange(null)
  const [open, handleOpen] = useHandleState(false)
  const extraProps = React.useMemo(
    () =>
      props.clearable
        ? {
            open,
            onClose: handleOpen(false),
            onDoubleClick: handleOpen(true),
          }
        : {},
    [handleOpen, open, props.clearable]
  )

  function outgoing(v: MaterialUiPickersDate) {
    return v?.toISOString(true) || null
  }

  return (
    <>
      {show && (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {props.name !== undefined ? (
            <input
              type={props.debugNamedInput ? "text" : "hidden"}
              name={props.name}
              value={outgoing(dateTime) || ""}
              onChange={() => {}}
            />
          ) : null}

          <MUIDateTimePicker
            {...extraProps}
            ref={ref}
            required={props.required}
            fullWidth
            label={label}
            size={props.size}
            margin={props.margin}
            disabled={props.disabled}
            inputVariant="outlined"
            value={dateTime || undefined}
            labelFunc={() => {
              if (dateTime !== null) {
                return `   ${formatDateTime(
                  dateTime.toISOString(),
                  props.timeZone
                )}`
              } else {
                return ""
              }
            }}
            onChange={v => {
              onChange(outgoing(v))
            }}
            InputProps={{
              startAdornment: (
                <IconButton size="small" onClick={handleOpen(true)}>
                  <CalendarTodayIcon fontSize="inherit" />
                </IconButton>
              ),
              endAdornment: (
                <>
                  {props.clearable && dateTime !== null && (
                    <IconButton size="small" onClick={handleClear}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </>
              ),
            }}
          />
        </MuiPickersUtilsProvider>
      )}
    </>
  )
})
