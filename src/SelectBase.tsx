import { PropTypes } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MUISelect from "@material-ui/core/Select"
import { startCase } from "lodash"
import React from "react"
import { OptionType } from "./SelectCombo"

export interface SelectBaseProps {
  name?: string
  value: string | number | null
  onChange: (value: string | number | null) => void
  options: OptionType[]
  label?: string
  fullWidth?: boolean
  disabled?: boolean
  isNumeric?: boolean
  allowNull?: boolean
  nullLabel?: string
  required?: boolean
  margin?: PropTypes.Margin
  size?: "medium" | "small"
}

export const SelectBase = React.forwardRef<HTMLDivElement, SelectBaseProps>(
  ({ value, disabled, size, margin, ...props }, ref) => {
    const label =
      props.label === undefined ? startCase(props.name) : props.label
    const [isNumeric, setIsNumeric] = React.useState(typeof value === "number")
    React.useEffect(() => {
      if (props.isNumeric !== undefined) {
        setIsNumeric(props.isNumeric)
      }
    }, [props.isNumeric])

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
      let v = event.currentTarget.value as string | null
      v = props.allowNull && v === nullLabel ? null : v
      if (isNumeric) {
        props.onChange(Number(v))
        return
      }
      props.onChange(v)
    }

    const selectedValue = value || null
    const isNullOptionDisabled = !props.allowNull && selectedValue !== null

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
          onChange={handleChange}
          labelWidth={labelWidth}
          inputProps={{
            name: props.name,
          }}
        >
          <option disabled={isNullOptionDisabled}>{nullLabel}</option>
          {props.options.map((o, x) => (
            <option key={x} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </MUISelect>
      </FormControl>
    )
  }
)
