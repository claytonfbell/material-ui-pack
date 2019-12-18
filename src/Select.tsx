import React, { useEffect } from "react"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import MUISelect from "@material-ui/core/Select"
import startCase from "lodash/startCase"

import { OptionType } from "./SelectCombo"
import { useForm } from "./FormProvider"

export interface SelectProps {
  name: string
  options: OptionType[]
  label?: string
  fullWidth?: boolean
  disabled?: boolean
}
export default function Select(props: SelectProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()

  const label = props.label === undefined ? startCase(props.name) : props.label
  const value = getValue(props.name)
  const disabled = busy || props.disabled

  const [labelWidth, setLabelWidth] = React.useState(0)
  const inputLabel = React.useRef<HTMLLabelElement>(null)
  useEffect(() => {
    const width =
      inputLabel.current !== null ? inputLabel.current.offsetWidth : 0
    setLabelWidth(width)
  }, [])

  return (
    <FormControl
      disabled={disabled}
      fullWidth
      variant="outlined"
      size={size}
      margin={margin}
    >
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <MUISelect
        disabled={disabled}
        fullWidth
        native
        value={value}
        onChange={e => setValue(props.name, e.currentTarget.value as string)}
        labelWidth={labelWidth}
        inputProps={{
          name: props.name,
        }}
      >
        <option disabled selected={value === null || value === undefined}>
          SELECT
        </option>
        {props.options.map((o, x) => (
          <option value={o.value}>{o.label}</option>
        ))}
      </MUISelect>
    </FormControl>
  )
}
