import { PropTypes } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MUISelect from "@material-ui/core/Select"
import { startCase } from "lodash"
import React from "react"
import { OptionType } from "./SelectComboBase"

export type SelectValue = string | number | boolean | null

export interface SelectBaseProps {
  name?: string
  value: SelectValue
  onChange: (value: SelectValue) => void
  options: OptionType[]
  label?: React.ReactNode
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
  ({ value, disabled, size = "small", margin, ...props }, ref) => {
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
      const stringValue = event.currentTarget.value as string
      const newValue = props.options.find(o => String(o.value) === stringValue)
        ?.value
      props.onChange(newValue === undefined ? null : newValue)
    }

    const isNullOptionDisabled = !props.allowNull && value !== null

    // we use string values in the material-ui select component
    const selectedValue: string =
      value === undefined || value === null ? `null` : String(value)

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
          value={selectedValue}
          labelWidth={labelWidth}
          inputProps={{
            name: props.name,
          }}
          onChange={handleChange}
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
        </MUISelect>
      </FormControl>
    )
  }
)
