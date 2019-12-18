import React, { useEffect, useState } from "react"
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
  isNumeric?: boolean
}
export default function Select(props: SelectProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()

  const label = props.label === undefined ? startCase(props.name) : props.label
  const value = getValue(props.name)
  const [isNumeric, setIsNumeric] = useState(typeof value === "number")
  useEffect(() => {
    if (props.isNumeric !== undefined) {
      setIsNumeric(props.isNumeric)
    }
  }, [props.isNumeric])

  const disabled = busy || props.disabled

  const [labelWidth, setLabelWidth] = React.useState(0)
  const inputLabel = React.useRef<HTMLLabelElement>(null)
  useEffect(() => {
    const width =
      inputLabel.current !== null ? inputLabel.current.offsetWidth : 0
    setLabelWidth(width)
  }, [])

  function handleChange(
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
    child: React.ReactNode
  ) {
    let v = event.currentTarget.value as string
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
        <option disabled>SELECT</option>
        {props.options.map((o, x) => (
          <option key={x} value={o.value}>
            {o.label}
          </option>
        ))}
      </MUISelect>
    </FormControl>
  )
}
