import TextField from "@mui/material/TextField"
import { startCase } from "lodash"
import React from "react"
import { OptionType } from "./SelectComboBase"

export type SelectValue = string | number | boolean | null

export interface SelectBaseProps {
  name?: string
  value: SelectValue
  onChange: (value: SelectValue) => void
  options: OptionType[]
  label?: string
  fullWidth?: boolean
  disabled?: boolean
  allowNull?: boolean
  nullLabel?: string
  required?: boolean
  margin?: "none" | "dense" | "normal" | undefined
  size?: "medium" | "small"
  /**
   * @deprecated - uses value type of whatever is passed into options array
   */
  isNumeric?: boolean
}

export const SelectBase = React.forwardRef<HTMLDivElement, SelectBaseProps>(
  ({ value, disabled, size = "small", margin, ...props }, ref) => {
    const label =
      props.label === undefined ? startCase(props.name) : props.label

    const nullLabel =
      props.nullLabel !== undefined
        ? props.nullLabel
        : props.allowNull
        ? "NONE"
        : "SELECT"

    function handleChange(
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>
    ) {
      const stringValue = event.target.value as string
      const newValue = props.options.find(o => String(o.value) === stringValue)
        ?.value
      props.onChange(newValue === undefined ? null : newValue)
    }

    const isNullOptionDisabled = !props.allowNull && value !== null

    // we use string values in the material-ui select component
    const selectedValue: string =
      value === undefined || value === null ? `null` : String(value)

    return (
      <TextField
        select
        ref={ref}
        label={label}
        disabled={disabled}
        fullWidth
        variant="outlined"
        size={size}
        margin={margin}
        required={props.required}
        value={selectedValue}
        name={props.name}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
      >
        <option
          disabled={isNullOptionDisabled}
          value="null"
          onSelect={() => props.onChange(null)}
        >
          {nullLabel}
        </option>
        {props.options.map((o, x) => (
          <option key={x} value={String(o.value)} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </TextField>
    )
  }
)
