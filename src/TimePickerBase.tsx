import { PickersActionBarAction } from "@mui/x-date-pickers/PickersActionBar"
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
  required?: boolean
  adapterLocale?: string
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
    required,
    adapterLocale = "en",
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

  const actions: PickersActionBarAction[] = ["accept"]
  if (clearable) {
    actions.unshift("clear")
  }

  return (
    <DateTimeLocalizationProvider adapterLocale={adapterLocale}>
      <TimePicker
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
            ...props.slotProps?.textField,
            id,
            name,
            size,
            margin,
            required,
          },
          field: {
            ...props.slotProps?.field,
            clearable,
            onClear: () => onChange(null),
            shouldRespectLeadingZeros: true,
          },
        }}
      />
    </DateTimeLocalizationProvider>
  )
})
