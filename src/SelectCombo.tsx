import React, { useState, useEffect } from "react"
import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import startCase from "lodash/startCase"

import { useForm } from "./FormProvider"

export interface OptionType {
  value: string | number
  label: string
}

export interface BaseSelectComboProps {
  name: string
  label?: string
  disabled?: boolean
  matchValue?: boolean
  autoComplete?: string
}

export interface SelectComboProps extends BaseSelectComboProps {
  options: OptionType[]
  onInputChange?: (str: string) => void
  formatter?: (str: string) => string
  type?: string
}
export default function SelectCombo(props: SelectComboProps) {
  const {
    getValue,
    setValue,
    formProps: { margin, size, busy },
  } = useForm()
  const label = props.label === undefined ? startCase(props.name) : props.label

  const value = getValue(props.name)
  const [selected, setSelected] = useState<OptionType | null | undefined>(
    undefined
  )
  const [index, setIndex] = useState(-2)

  useEffect(() => {
    setIndex(props.options.findIndex(x => x.value === value))
  }, [value, props.options])

  useEffect(() => {
    setSelected(index === -1 ? null : props.options[index])
  }, [index, props.options])

  function handleChange(_: any, v: OptionType | null) {
    setSelected(v)
    setValue(props.name, v === null ? "" : v.value)
  }

  const [inputText, setInputText] = useState("")
  useEffect(() => {
    if (props.matchValue) {
      const find = props.options.find(x => x.value === inputText)
      if (find !== undefined) {
        setInputText(find.label)
      }
    }
  }, [inputText, props.matchValue, props.options])

  const [hasFocus, setHasFocus] = useState(false)
  const [touched, setTouched] = useState(false)
  useEffect(() => {
    if (!hasFocus) {
      setTouched(false)
    }
  }, [hasFocus])

  // formatters
  let fmt = (v: string) => v
  fmt = props.formatter !== undefined ? props.formatter : fmt

  return (
    <>
      {selected !== undefined && (
        <Autocomplete
          size={size}
          disabled={busy || props.disabled}
          autoHighlight
          autoSelect={touched}
          options={props.options}
          getOptionLabel={(option: OptionType) => option.label}
          defaultValue={props.options[index]}
          onChange={handleChange}
          inputValue={inputText}
          onInputChange={(_, v) => {
            setTouched(true)
            setInputText(fmt(v))
            if (props.onInputChange !== undefined) {
              props.onInputChange(fmt(v))
            }
          }}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          style={{ width: `100%` }}
          renderInput={params => (
            <TextField
              {...params}
              type={props.type}
              margin={margin}
              label={label}
              variant="outlined"
              fullWidth
              onChange={() => {}}
              onBlur={() => {}}
              autoComplete={props.autoComplete}
            />
          )}
        />
      )}
    </>
  )
}
