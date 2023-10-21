import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker"
import dayjs, { Dayjs } from "dayjs"
import startCase from "lodash/startCase"
import React, { useMemo } from "react"
import { DateTimeLocalizationProvider } from "./DateTimeLocalizationProvider"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DateTimePickerBaseProps = Omit<
  DateTimePickerProps<Dayjs>,
  "onChange" | "value"
> & {
  name?: string
  onChange: (value: string | null) => void
  value: string | null
  clearable?: boolean
  size?: "small" | "medium"
  margin?: "none" | "dense" | "normal"
}

export const DateTimePickerBase = React.forwardRef<
  HTMLDivElement,
  DateTimePickerBaseProps
>((originalProps, ref) => {
  const {
    value: stringValue,
    onChange,
    format = "lll",
    clearable,
    name,
    size,
    margin,
    ...props
  } = originalProps

  const value = useMemo(() => {
    return stringValue === null ? null : dayjs(stringValue)
  }, [stringValue])

  function handleChange(newValue: Dayjs | null) {
    onChange(newValue === null ? null : newValue.toISOString())
  }

  const label = props.label === undefined ? startCase(name) : props.label

  return (
    <DateTimeLocalizationProvider>
      <DateTimePicker
        {...props}
        ref={ref}
        label={label}
        value={value}
        onChange={handleChange}
        format={format}
        slotProps={{
          textField: {
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
