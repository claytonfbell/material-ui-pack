import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import startCase from "lodash.startcase"
import React, { useMemo } from "react"
import { DateTimeLocalizationProvider } from "./DateTimeLocalizationProvider"
import { PickersActionBarAction } from "@mui/x-date-pickers/PickersActionBar"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DatePickerBaseProps = Omit<
  DatePickerProps<Dayjs>,
  "onChange" | "value"
> & {
  id?: string
  name?: string
  onChange: (value: string | null) => void
  value: string | null
  clearable?: boolean
  size?: "small" | "medium"
  margin?: "none" | "dense" | "normal"
  required?: boolean
  adapterLocale?: string
}

export const DatePickerBase = React.forwardRef<
  HTMLDivElement,
  DatePickerBaseProps
>((originalProps, ref) => {
  const {
    value: stringValue,
    onChange,
    clearable,
    format = "M/D/YYYY",
    id,
    name,
    size,
    margin,
    required,
    adapterLocale = "en",
    ...props
  } = originalProps

  const value = useMemo(() => {
    return stringValue === null ? null : dayjs(stringValue)
  }, [stringValue])

  function handleChange(newValue: Dayjs | null) {
    onChange(newValue === null ? null : newValue.format("YYYY-MM-DD"))
  }

  const label = props.label === undefined ? startCase(name) : props.label

  const actions: PickersActionBarAction[] = ["accept"]
  if (clearable) {
    actions.unshift("clear")
  }

  return (
    <DateTimeLocalizationProvider adapterLocale={adapterLocale}>
      <DatePicker
        {...props}
        ref={ref}
        label={label}
        value={value}
        onChange={handleChange}
        format={format}
        slotProps={{
          ...props.slotProps,
          actionBar: {
            actions,
            ...props.slotProps?.actionBar,
          },
          textField: {
            id,
            name,
            size,
            margin,
            required,
          },
          field: {
            clearable,
            onClear: () => onChange(null),
            shouldRespectLeadingZeros: true,
          },
        }}
      />
    </DateTimeLocalizationProvider>
  )
})
