import AccessTimeIcon from "@mui/icons-material/AccessTime"
import DateAdapter from "@mui/lab/AdapterMoment"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import MUITimePicker from "@mui/lab/MobileTimePicker"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import { startCase } from "lodash"
import moment from "moment-timezone"
import React, { useState } from "react"

type Value = string | null
type OnChange = (newValue: Value) => void

export interface TimePickerBaseProps {
  value: Value
  onChange: OnChange
  name?: string
  label?: React.ReactNode
  disabled?: boolean
  required?: boolean
  margin?: "none" | "dense" | "normal" | undefined
  size?: "medium" | "small"
  debugNamedInput?: boolean
}
export const TimePickerBase = React.forwardRef<
  HTMLDivElement,
  TimePickerBaseProps
>((props, ref) => {
  const [open, setOpen] = useState(false)

  const label = props.label === undefined ? startCase(props.name) : props.label

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MUITimePicker
        ref={ref}
        label={label}
        disabled={props.disabled}
        value={moment(`${moment().format("YYYY-MM-DD")} ${props.value}`)}
        onChange={e => {
          props.onChange(e === null ? null : e.format("HH:mm:00"))
        }}
        open={open}
        onClose={() => setOpen(false)}
        renderInput={params => (
          <TextField
            fullWidth
            size={props.size}
            margin={props.margin}
            required={props.required}
            variant="outlined"
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <IconButton onClick={() => setOpen(true)}>
                    <AccessTimeIcon fontSize="inherit" />
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
})
