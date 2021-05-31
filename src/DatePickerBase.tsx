import MomentUtils from "@date-io/moment"
import { PropTypes } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import CloseIcon from "@material-ui/icons/Close"
import {
  DatePicker as MUIDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import { startCase } from "lodash"
import moment from "moment-timezone"
import React from "react"
import { useHandleState } from "./hooks/useHandleState"

type Value = string | null
type OnChange = (newValue: Value) => void

export interface DatePickerBaseProps {
  value?: Value
  onChange?: OnChange
  name?: string
  label?: string
  disabled?: boolean
  clearable?: boolean
  required?: boolean
  margin?: PropTypes.Margin
  size?: "medium" | "small"
  debugNamedInput?: boolean
}

export const DatePickerBase = React.forwardRef<
  HTMLDivElement,
  DatePickerBaseProps
>(({ value: propsValue, onChange: propsOnChange, ...props }, ref) => {
  // manage state if no value and onChange
  const [state, setState] = React.useState<Value>(null)
  const value = propsValue !== undefined ? propsValue : state
  const onChange: OnChange =
    propsOnChange !== undefined ? propsOnChange : x => setState(x)

  const dateTime = React.useMemo(
    () => (value === null ? null : moment(value as string)),
    [value]
  )
  const label = props.label === undefined ? startCase(props.name) : props.label

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
    return v?.format("YYYY-MM-DD") || null
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {props.name !== undefined ? (
        <input
          type={props.debugNamedInput ? "text" : "hidden"}
          name={props.name}
          value={outgoing(dateTime) || ""}
          onChange={() => {}}
        />
      ) : null}

      <MUIDatePicker
        {...extraProps}
        ref={ref}
        clearable={props.clearable}
        fullWidth={true}
        label={label}
        size={props.size}
        margin={props.margin}
        disabled={props.disabled}
        required={props.required}
        value={dateTime}
        onChange={v => {
          onChange(outgoing(v))
        }}
        autoOk
        inputVariant="outlined"
        format={"   LL"}
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
  )
})
