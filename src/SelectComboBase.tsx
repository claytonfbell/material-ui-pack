import { makeStyles, PropTypes } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { startCase } from "lodash"
import React from "react"
import { SelectValue } from "./SelectBase"

const useStyles = makeStyles({
  txt: {
    "& input::-ms-clear": {
      display: "none",
    },
  },
})

export interface OptionType {
  value: string | number | boolean
  label: string
  disabled?: boolean
}

export interface BaseSelectComboProps {
  value: SelectValue
  onChange: (newValue: SelectValue) => void
  name?: string
  label?: string
  disabled?: boolean
  matchValue?: boolean
  autoComplete?: string
  required?: boolean
  margin?: PropTypes.Margin
  size?: "medium" | "small"
}

export interface SelectComboBaseProps extends BaseSelectComboProps {
  options: OptionType[]
  onInputChange?: (str: string) => void
  formatter?: (str: string) => string
  type?: string
}

export const SelectComboBase = React.forwardRef<
  HTMLDivElement,
  SelectComboBaseProps
>(({ value, onChange, size = "small", margin = "none", ...props }, ref) => {
  const classes = useStyles()

  const label = props.label === undefined ? startCase(props.name) : props.label

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
    onChange(v === null ? "" : v.value)
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
          disabled={props.disabled}
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
              ref={ref}
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
})