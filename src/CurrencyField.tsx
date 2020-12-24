// import TextField from "./TextField"
import { InputAdornment, makeStyles } from "@material-ui/core"
import MUITextField from "@material-ui/core/TextField/TextField"
import { startCase } from "lodash"
import React from "react"
import { useForm } from "./FormProvider"

const useStyles = makeStyles({
  root: {
    "& input": {
      textAlign: "right",
    },
  },
})

interface CurrencyFieldProps {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  allowNegative?: boolean
  alignRight?: boolean
  numeric?: boolean
  blankZero?: boolean
  inPennies?: boolean
  fulleWidth?: boolean
}
export function CurrencyField(props: CurrencyFieldProps) {
  const classes = useStyles()

  const { getValue, setValue, formProps } = useForm()
  const value = (React.useMemo(() => getValue(props.name), [
    getValue,
    props.name,
  ]) || "") as string | number

  const [hasFocus, setHasFocus] = React.useState(false)

  const incoming = React.useCallback(
    (v: string | number): string => {
      v = props.inPennies ? Number(Number(v) / 100).toFixed(2) : v
      v = Number(v).toFixed(2)
      if (props.blankZero && v === "0.00") {
        return ""
      }
      return String(v)
    },
    [props.blankZero, props.inPennies]
  )

  const outgoing = React.useCallback(
    (v: string): string | number => {
      v = Number(v).toFixed(2)
      v = props.inPennies ? v.replace(/\./g, "") : v
      if (props.numeric) {
        return Number(v)
      } else {
        return v
      }
    },
    [props.inPennies, props.numeric]
  )

  const [inputValue, setInputValue] = React.useState<string>(incoming(value))

  React.useEffect(() => {
    setInputValue(incoming(value))
  }, [incoming, value])

  React.useEffect(() => {
    if (!hasFocus) {
      if (Number(outgoing(inputValue)) !== Number(value)) {
        setValue(props.name, outgoing(inputValue))
      }
    }
  }, [hasFocus, inputValue, outgoing, props.name, setValue, value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(fmt(e.target.value))
  }

  function handleBlur() {
    setHasFocus(false)
    setInputValue(formatBlur(inputValue))
  }

  function handleFocus() {
    setHasFocus(true)
  }

  const fmt = (s: string) => {
    return s
      .replace(/[^0-9.-]/g, "")
      .replace(/[.]+/g, ".")
      .replace(/[-]+/g, "-")
      .replace(/^(-?[0-9]+)(\.[0-9]{1,2}).*/g, "$1$2")
  }
  const formatBlur = (s: string) => {
    s = isNaN(Number(s)) ? "0" : s

    if (s.length > 2) {
      s = s.substr(0, 1) + s.substr(1, s.length - 1).replace(/-/g, "")
    }
    if (!props.allowNegative) {
      s = s.replace(/-/g, "")
    }
    s = Number(fmt(s)).toFixed(2)
    if (props.blankZero && s === "0.00") {
      return ""
    }
    return s
  }

  const label = props.label === undefined ? startCase(props.name) : props.label

  return (
    <MUITextField
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      disabled={props.disabled || formProps.busy}
      className={props.alignRight ? classes.root : undefined}
      margin={formProps.margin}
      variant="outlined"
      size={formProps.size}
      name={props.name}
      required={props.required}
      label={label}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      fullWidth={props.fulleWidth}
    />
  )
}
