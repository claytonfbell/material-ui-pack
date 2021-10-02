import CloseIcon from "@mui/icons-material/Close"
import DateAdapter from "@mui/lab/AdapterMoment"
import DatePicker from "@mui/lab/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import { startCase } from "lodash"
import moment, { Moment } from "moment-timezone"
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
  margin?: "none" | "dense" | "normal" | undefined
  size?: "medium" | "small"
  debugNamedInput?: boolean
}

export const DatePickerBase = React.forwardRef<
  HTMLDivElement,
  DatePickerBaseProps
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

    const dateTime = React.useMemo(
      () => (value === null ? null : moment(value as string)),
      [value]
    )
    const label =
      props.label === undefined ? startCase(props.name) : props.label

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
      return v?.format("YYYY-MM-DD") || null
    }

    return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        {props.name !== undefined ? (
          <input
            type={props.debugNamedInput ? "text" : "hidden"}
            name={props.name}
            value={outgoing(dateTime) || ""}
            onChange={() => {}}
          />
        ) : null}

        {/* autoOk */}
        {/* format={"   LL"} */}

        <DatePicker
          {...extraProps}
          ref={ref}
          clearable={props.clearable}
          label={label}
          disabled={props.disabled}
          value={dateTime}
          onChange={v => {
            onChange(outgoing(v))
          }}
          InputProps={{
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
          renderInput={params => (
            <TextField
              fullWidth={true}
              size={size}
              margin={props.margin}
              required={props.required}
              variant="outlined"
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    )
  }
)
