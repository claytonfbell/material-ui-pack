import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker"
import dayjs, { Dayjs } from "dayjs"
import startCase from "lodash.startcase"
import React, { useMemo } from "react"
import { DateTimeLocalizationProvider } from "./DateTimeLocalizationProvider"
import { PickersActionBarAction } from "@mui/x-date-pickers/PickersActionBar"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DateTimePickerBaseProps = Omit<
  DateTimePickerProps<Dayjs>,
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

export const DateTimePickerBase = React.forwardRef<
  HTMLDivElement,
  DateTimePickerBaseProps
>((originalProps, ref) => {
  const {
    value: stringValue,
    onChange,
    format = "M/D/YYYY h:mm A",
    clearable,
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
    onChange(newValue === null ? null : newValue.toISOString())
  }

  const label = props.label === undefined ? startCase(name) : props.label

  const actions: PickersActionBarAction[] = ["accept"]
  if (clearable) {
    actions.unshift("clear")
  }

  return (
    <DateTimeLocalizationProvider adapterLocale={adapterLocale}>
      <DateTimePicker
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
