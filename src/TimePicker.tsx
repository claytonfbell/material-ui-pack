import DateAdapter from "@mui/lab/AdapterMoment"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import MUITimePicker from "@mui/lab/TimePicker"
import TextField from "@mui/material/TextField"
import { startCase } from "lodash"
import moment from "moment-timezone"
import React from "react"
import { useForm } from "./FormProvider"

export interface TimePickerProps {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
}
export function TimePicker(props: TimePickerProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm<any>()
  let value = getValue(props.name) as string | null
  if (value === undefined || value === null) {
    value = moment().format("HH:mm:ss")
  }
  value = `${moment().format("YYYY-MM-DD")} ${value}`

  const label = props.label === undefined ? startCase(props.name) : props.label

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      {/* format={"h:mm A"} */}

      <MUITimePicker
        label={label}
        disabled={props.disabled || busy}
        value={value}
        onChange={e => {
          setValue(
            props.name,
            e === null ? null : moment(`2021-01-01 ${e}`).format("HH:mm:00")
          )
        }}
        renderInput={params => (
          <TextField
            fullWidth
            size={size}
            margin={margin}
            required={props.required}
            variant="outlined"
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  )
}
