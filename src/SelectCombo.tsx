import { makeStyles } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { startCase } from "lodash"
import React from "react"
import { useForm } from "./FormProvider"

const useStyles = makeStyles({
  txt: {
    "& input::-ms-clear": {
      display: "none",
    },
  },
})

export interface OptionType {
  value: string | number
  label: string
  disabled?: boolean
}

export interface BaseSelectComboProps {
  name: string
  label?: string
  disabled?: boolean
  matchValue?: boolean
  autoComplete?: string
  required?: boolean
}

export interface SelectComboProps extends BaseSelectComboProps {
  options: OptionType[]
  onInputChange?: (str: string) => void
  formatter?: (str: string) => string
  type?: string
}
export function SelectCombo(props: SelectComboProps) {
  const classes = useStyles()
  const {
    getValue,
    setValue,
    formProps: { margin, size, busy },
  } = useForm()
  const label = props.label === undefined ? startCase(props.name) : props.label

  const value = getValue(props.name)
  const [selected, setSelected] = React.useState<OptionType | null | undefined>(
    undefined
  )
  const [index, setIndex] = React.useState(-2)

  React.useEffect(() => {
    setIndex(props.options.findIndex(x => x.value === value))
  }, [value, props.options])

  React.useEffect(() => {
    setSelected(index === -1 ? null : props.options[index])
  }, [index, props.options])

  function handleChange(_: any, v: OptionType | null) {
    setSelected(v)
    setValue(props.name, v === null ? "" : v.value)
  }

  const [inputText, setInputText] = React.useState("")
  React.useEffect(() => {
    if (props.matchValue) {
      const find = props.options.find(x => x.value === inputText)
      if (find !== undefined) {
        setInputText(find.label)
      }
    }
  }, [inputText, props.matchValue, props.options])

  const [hasFocus, setHasFocus] = React.useState(false)
  const [touched, setTouched] = React.useState(false)
  React.useEffect(() => {
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
          onInputChange={(_: unknown, v: string) => {
            setTouched(true)
            setInputText(fmt(v))
            if (props.onInputChange !== undefined) {
              props.onInputChange(fmt(v))
            }
          }}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          style={{ width: `100%` }}
          renderInput={(params: unknown) => (
            <TextField
              {...params}
              className={classes.txt}
              type={props.type}
              name={props.name}
              margin={margin}
              label={label}
              variant="outlined"
              fullWidth
              onChange={() => {}}
              onBlur={() => {}}
              autoComplete={props.autoComplete}
              required={props.required}
            />
          )}
        />
      )}
    </>
  )
}
