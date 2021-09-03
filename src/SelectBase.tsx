import { PropTypes } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MUISelect from "@material-ui/core/Select"
import { startCase } from "lodash"
import React from "react"
import { OptionType } from "./SelectCombo"

export type SelectValue = string | number | boolean | null

// encode because option values are actually strings, by encoding we support boolean, number or null types
function encodeValue(value: SelectValue) {
  return Buffer.from(JSON.stringify({ value })).toString("base64")
}
function decodeValue(encodedValue: string) {
  return JSON.parse(Buffer.from(encodedValue, "base64").toString())
    .value as SelectValue
}

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
  margin?: PropTypes.Margin
  size?: "medium" | "small"
  /**
   * @deprecated - uses value type of whatever is passed into options array
   */
  isNumeric?: boolean
}

export const SelectBase = React.forwardRef<HTMLDivElement, SelectBaseProps>(
  ({ value, disabled, size, margin, ...props }, ref) => {
    const label =
      props.label === undefined ? startCase(props.name) : props.label

    const [labelWidth, setLabelWidth] = React.useState(0)
    const inputLabel = React.useRef<HTMLLabelElement>(null)
    React.useEffect(() => {
      const width =
        inputLabel.current !== null ? inputLabel.current.offsetWidth : 0
      setLabelWidth(width)
    }, [])

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
      const encodedValue = event.currentTarget.value
      let v = decodeValue(encodedValue as string)
      props.onChange(v)
    }

    const isNullOptionDisabled = !props.allowNull && value !== null
    const selectedValue = value === undefined ? null : value

    return (
      <FormControl
        ref={ref}
        disabled={disabled}
        fullWidth
        variant="outlined"
        size={size}
        margin={margin}
        required={props.required}
      >
        <InputLabel ref={inputLabel}>{label}</InputLabel>
        <MUISelect
          disabled={disabled}
          fullWidth
          native
          value={encodeValue(selectedValue)}
          onChange={handleChange}
          labelWidth={labelWidth}
          inputProps={{
            name: props.name,
          }}
        >
          <option disabled={isNullOptionDisabled} value={encodeValue(null)}>
            {nullLabel}
          </option>
          {props.options.map((o, x) => (
            <option key={x} value={encodeValue(o.value)} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </MUISelect>
      </FormControl>
    )
  }
)
