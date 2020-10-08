import InputAdornment from "@material-ui/core/InputAdornment"
import React from "react"
import { useForm } from "./FormProvider"
import { TextField } from "./TextField"

export interface PercentageFieldProps {
  name: string
  label?: string
  disabled?: boolean
  decimals: 2 | 3 | 4 | 5 | 6
  required?: boolean
}
export const PercentageField = React.forwardRef(
  (props: PercentageFieldProps, ref: any) => {
    const { getValue, setValue } = useForm()
    const fmt = (s: string) => {
      let str = s.replace(/[^\d.]/g, "")
      let parts = str.split(".")
      if (parts.length > 2) {
        parts = parts.slice(0, 2)
      }
      if (parts.length === 2 && parts[1].length > props.decimals - 2) {
        parts[1] = parts[1].substr(0, props.decimals - 2)
      }
      str = parts.join(".")
      return str
    }

    const toNumber = React.useCallback(
      (v: string | null) => (v === null ? 0 : Number(v)),
      []
    )

    const toPercent = React.useCallback(
      (v: string) => {
        let newValue = parseFloat(
          (toNumber(v) * 100).toFixed(props.decimals - 2)
        ).toString()
        if (newValue === "0") {
          newValue = ""
        }
        return newValue
      },
      [toNumber, props.decimals]
    )

    const toDecimal = React.useCallback(
      (v: string) => Number((toNumber(v) / 100).toFixed(props.decimals)),
      [toNumber, props.decimals]
    )

    const defaultValue = String(getValue(props.name) as number)

    const [state, setState] = React.useState(toPercent(defaultValue))
    React.useEffect(() => {
      setState(toPercent(defaultValue))
    }, [defaultValue, toPercent])

    React.useEffect(() => {
      setState(toPercent(defaultValue))
    }, [defaultValue, toPercent])

    return (
      <TextField
        {...props}
        ref={ref}
        required={props.required}
        name={props.name}
        label={props.label}
        disabled={props.disabled}
        value={state}
        onChange={(e) => setState(fmt(e.currentTarget.value))}
        onBlur={(e) => setValue(props.name, toDecimal(e.currentTarget.value))}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />
    )
  }
)
