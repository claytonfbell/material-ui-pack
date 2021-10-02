import CloseIcon from "@mui/icons-material/Close"
import DateAdapter from "@mui/lab/AdapterMoment"
import DateTimePicker from "@mui/lab/DateTimePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import { startCase } from "lodash"
import moment, { Moment } from "moment-timezone"
import React from "react"
import { useHandleState } from "./hooks/useHandleState"
import { getTimeZone } from "./util/formatDateTime"

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
  margin?: "none" | "dense" | "normal" | undefined
  size?: "medium" | "small"
  debugNamedInput?: boolean
}

export const DateTimePickerBase = React.forwardRef<
  HTMLDivElement,
  DateTimePickerBaseProps
>(
  (
    { value: propsValue, onChange: propsOnChange, size = "small", ...props },
    ref
  ) => {
    // manage state if no value and onChange
    const [state, setState] = React.useState<Value>(null)
    const value = propsValue !== undefined ? propsValue : state
    const onChange: OnChange =
      propsOnChange !== undefined ? propsOnChange : x => setState(x)

    const label =
      props.label === undefined ? startCase(props.name) : props.label

    const dateTime = React.useMemo(
      () =>
        value === null
          ? null
          : props.timeZone !== undefined
          ? moment(value || undefined).tz(getTimeZone(props.timeZone))
          : moment(value || undefined),
      [value]
    )

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

    function outgoing(v: Moment | null) {
      return v?.toISOString(true) || null
    }

    return (
      <>
        <LocalizationProvider dateAdapter={DateAdapter}>
          {props.name !== undefined ? (
            <input
              type={props.debugNamedInput ? "text" : "hidden"}
              name={props.name}
              value={outgoing(dateTime) || ""}
              onChange={() => {}}
            />
          ) : null}

          {/* labelFunc={() => {
                if (dateTime !== null) {
                  return `   ${formatDateTime(
                    dateTime.toISOString(),
                    props.timeZone
                  )}`
                } else {
                  return ""
                }
              }} */}

          <DateTimePicker
            {...extraProps}
            ref={ref}
            label={label}
            disabled={props.disabled}
            value={dateTime || undefined}
            onChange={v => {
              onChange(outgoing(v))
            }}
            renderInput={p => (
              <TextField
                required={p.required}
                fullWidth
                size={size}
                margin={p.margin}
                variant="outlined"
                {...p}
                InputProps={{
                  ...p.InputProps,
                  endAdornment: (
                    <>
                      {props.clearable && dateTime !== null && (
                        <IconButton size="small" onClick={handleClear}>
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      )}
                      {p.InputProps?.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </LocalizationProvider>
      </>
    )
  }
)
