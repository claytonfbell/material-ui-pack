import InputAdornment from "@material-ui/core/InputAdornment"
import React from "react"
import { useForm } from "./FormProvider"
import TextField from "./TextField"

interface CurrencyFieldProps {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  allowNegative?: boolean
}
export default function CurrencyField(props: CurrencyFieldProps) {
  const { setValue } = useForm()
  const fmt = (s: string) =>
    s
      .replace(/[^0-9.-]/g, "")
      .replace(/[.]+/g, ".")
      .replace(/[-]+/g, "-")
      .replace(/^(-?[0-9]+)(\.[0-9]{1,2}).*/g, "$1$2")
  const formatBlur = (s: string) => {
    if (s.length > 2) {
      s = s.substr(0, 1) + s.substr(1, s.length - 1).replace(/-/g, "")
    }
    if (!props.allowNegative) {
        s = s.replace(/-/g, '')
    }
    return Number(fmt(s)).toFixed(2)
  }
  return (
    <TextField
      required={props.required}
      name={props.name}
      label={props.label}
      disabled={props.disabled}
      formatter={fmt}
      onBlur={(e) => setValue(props.name, formatBlur(e.currentTarget.value))}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  )
}
