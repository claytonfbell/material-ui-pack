import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker"
import dayjs, { Dayjs } from "dayjs"
import startCase from "lodash.startcase"
import React, { useMemo } from "react"
import { DateTimeLocalizationProvider } from "./DateTimeLocalizationProvider"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type TimePickerBaseProps = Omit<
  TimePickerProps<Dayjs>,
  "onChange" | "value"
> & {
  id?: string
  name?: string
  onChange: (value: string | null) => void
  value: string | null
  clearable?: boolean
  size?: "small" | "medium"
  margin?: "none" | "dense" | "normal"
}

export const TimePickerBase = React.forwardRef<
  HTMLDivElement,
  TimePickerBaseProps
>((originalProps, ref) => {
  const {
    value: stringValue,
    onChange,
    format,
    clearable,
    id,
    name,
    size,
    margin,
    ...props
  } = originalProps

  const value = useMemo(() => {
    return stringValue === null
      ? null
      : dayjs(dayjs().format("YYYY-MM-DD") + " " + stringValue)
  }, [stringValue])

  function handleChange(newValue: Dayjs | null) {
    onChange(newValue === null ? null : newValue.format("HH:mm:00"))
  }

  const label = props.label === undefined ? startCase(name) : props.label

  return (
    <DateTimeLocalizationProvider>
      <TimePicker
        {...props}
        ref={ref}
        label={label}
        value={value}
        onChange={handleChange}
        format={format}
        slotProps={{
          textField: {
            id,
            name,
            size,
            margin,
          },
          field: { clearable, onClear: () => onChange(null) },
        }}
      />
    </DateTimeLocalizationProvider>
  )
})
