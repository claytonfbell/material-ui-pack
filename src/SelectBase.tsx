import TextField, { TextFieldProps } from "@mui/material/TextField"
import startCase from "lodash/startCase"
import React from "react"
import { OptionType } from "./SelectComboBase"

export type SelectValue = string | number | boolean | null

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SelectBaseProps = Omit<TextFieldProps, "onChange" | "value"> & {
  value: SelectValue
  onChange: (value: SelectValue) => void
  options: OptionType[]
  allowNull?: boolean
  nullLabel?: string
}

export const SelectBase = React.forwardRef<HTMLDivElement, SelectBaseProps>(
  (originalProps, ref) => {
    const {
      value,
      onChange,
      options,
      allowNull,
      nullLabel: originalNullLabel,
      ...props
    } = originalProps

    const label =
      props.label === undefined ? startCase(props.name) : props.label

    const nullLabel =
      originalNullLabel !== undefined
        ? originalNullLabel
        : allowNull
        ? "NONE"
        : "SELECT"

    function handleChange(
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) {
      const stringValue = event.target.value as string
      const newValue = options.find(
        (o) => String(o.value) === stringValue
      )?.value
      onChange(newValue === undefined ? null : newValue)
    }

    const isNullOptionDisabled = !allowNull && value !== null

    // we use string values in the material-ui select component
    const selectedValue: string =
      value === undefined || value === null ? `null` : String(value)

    return (
      <TextField
        label={label}
        {...props}
        InputLabelProps={{
          shrink: true,
        }}
        select
        ref={ref}
        fullWidth
        value={selectedValue}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
      >
        <option
          disabled={isNullOptionDisabled}
          value="null"
          onSelect={() => onChange(null)}
        >
          {nullLabel}
        </option>
        {options.map((o, x) => (
          <option key={x} value={String(o.value)} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </TextField>
    )
  }
)
