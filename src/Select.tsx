import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MUISelect from "@material-ui/core/Select"
import { startCase } from "lodash"
import React from "react"
import { useForm } from "./FormProvider"
import { OptionType } from "./SelectCombo"

export interface SelectProps {
  name: string
  options: OptionType[]
  label?: string
  fullWidth?: boolean
  disabled?: boolean
  isNumeric?: boolean
  allowNull?: boolean
  nullLabel?: string
  required?: boolean
}
export function Select(props: SelectProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()

  const label = props.label === undefined ? startCase(props.name) : props.label
  const value = getValue(props.name)
  const [isNumeric, setIsNumeric] = React.useState(typeof value === "number")
  React.useEffect(() => {
    if (props.isNumeric !== undefined) {
      setIsNumeric(props.isNumeric)
    }
  }, [props.isNumeric])

  const disabled = busy || props.disabled

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
      setValue(props.name, Number(v))
      return
    }
    setValue(props.name, v)
  }

  return (
    <FormControl
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
        value={value}
        onChange={handleChange}
        labelWidth={labelWidth}
        inputProps={{
          name: props.name,
        }}
      >
        <option disabled={!props.allowNull && value !== null}>
          {nullLabel}
        </option>
        {props.options.map((o, x) => (
          <option key={x} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </MUISelect>
    </FormControl>
  )
}
