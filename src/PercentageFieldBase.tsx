import { PropTypes } from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"
import React from "react"
import { TextFieldBase } from "./TextFieldBase"

type OnChange = (newValue: number) => void

export interface PercentageFieldBaseProps {
  name?: string
  value?: number
  onChange?: OnChange
  label?: string
  disabled?: boolean
  decimals: 2 | 3 | 4 | 5 | 6
  required?: boolean
  fullWidth?: boolean
  margin?: PropTypes.Margin
  size?: "medium" | "small"
  debugNamedInput?: boolean
}
export const PercentageFieldBase = React.forwardRef(
  (
    {
      name,
      value: propsValue,
      onChange: propsOnChange,
      debugNamedInput,
      size = "small",
      ...props
    }: PercentageFieldBaseProps,
    ref: any
  ) => {
    // manage state if no value and onChange
    const [unmanagedState, setUnmanagedState] = React.useState<number>(0)
    const value = propsValue !== undefined ? propsValue : unmanagedState
    const onChange: OnChange =
      propsOnChange !== undefined ? propsOnChange : x => setUnmanagedState(x)

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

    const defaultValue = String(value)

    const [state, setState] = React.useState(toPercent(defaultValue))
    React.useEffect(() => {
      setState(toPercent(defaultValue))
    }, [defaultValue, toPercent])

    React.useEffect(() => {
      setState(toPercent(defaultValue))
    }, [defaultValue, toPercent])

    return (
      <>
        {name !== undefined ? (
          <input
            type={debugNamedInput ? "text" : "hidden"}
            name={name}
            value={toDecimal(state)}
            onChange={() => {}}
          />
        ) : null}

        <TextFieldBase
          {...props}
          fullWidth={props.fullWidth}
          ref={ref}
          required={props.required}
          label={props.label}
          disabled={props.disabled}
          value={state}
          onChange={newValue => setState(fmt(newValue))}
          onBlur={e => onChange(toDecimal(e.currentTarget.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          margin={props.margin}
          size={size}
        />
      </>
    )
  }
)
