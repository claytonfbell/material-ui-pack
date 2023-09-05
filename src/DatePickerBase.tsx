import { Close as CloseIcon, Event as EventIcon } from "@mui/icons-material"
import { MobileDatePicker } from "@mui/lab"
import DateAdapter from "@mui/lab/AdapterMoment"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import { startCase } from "lodash"
import moment, { Moment } from "moment-timezone"
import React, { useState } from "react"

type Value = string | null
type OnChange = (newValue: Value) => void

export interface DatePickerBaseProps {
  value?: Value
  onChange?: OnChange
  name?: string
  label?: React.ReactNode
  disabled?: boolean
  clearable?: boolean
  required?: boolean
  margin?: "none" | "dense" | "normal" | undefined
  size?: "medium" | "small"
  debugNamedInput?: boolean
  id?: string
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
      propsOnChange !== undefined ? propsOnChange : (x) => setState(x)

    const dateTime = React.useMemo(
      () => (value === null ? null : moment(value as string)),
      [value]
    )
    const label =
      props.label === undefined ? startCase(props.name) : props.label

    // control open state when clearable
    const handleClear = () => onChange(null)
    const [open, setOpen] = useState(false)
    const extraProps = React.useMemo(
      () =>
        props.clearable
          ? {
              open,
              onClose: () => setOpen(false),
              onDoubleClick: () => setOpen(true),
            }
          : {},
      [open, props.clearable]
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

        <MobileDatePicker
          {...extraProps}
          ref={ref}
          clearable={props.clearable}
          label={label}
          disabled={props.disabled}
          value={dateTime}
          onChange={(v: any) => {
            onChange(outgoing(v))
          }}
          open={open}
          onClose={() => setOpen(false)}
          renderInput={(params: any) => (
            <TextField
              id={props.id}
              fullWidth={true}
              size={size}
              margin={props.margin}
              required={props.required}
              variant="outlined"
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {props.clearable && dateTime !== null && (
                      <IconButton
                        onClick={handleClear}
                        disabled={params.disabled}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => setOpen(true)}
                      disabled={params.disabled}
                    >
                      <EventIcon fontSize="inherit" />
                    </IconButton>
                    {params.InputProps?.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </LocalizationProvider>
    )
  }
)
