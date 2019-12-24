import React from "react"
import TextField from "./TextField"
import { useForm } from "./FormProvider"
import InputAdornment from "@material-ui/core/InputAdornment"

interface PercentageFieldProps {
  name: string
  label?: string
  disabled?: boolean
  decimals: 2 | 3 | 4 | 5 | 6
}
export default function PercentageField(props: PercentageFieldProps) {
  const { getValue, setValue } = useForm()
  const fmt = (s: string) => s.replace(/[^0-9.]/g, "")

  const toNumber = React.useCallback(
    (v: string | null) => (v === null ? 0 : Number(v)),
    []
  )

  const toPercent = React.useCallback(
    (v: string) => (toNumber(v) * 100).toFixed(props.decimals - 2),
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

  return (
    <TextField
      name={props.name}
      label={props.label}
      disabled={props.disabled}
      value={state}
      onChange={e => setState(fmt(e.currentTarget.value))}
      onBlur={e => setValue(props.name, toDecimal(e.currentTarget.value))}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
    />
  )
}
