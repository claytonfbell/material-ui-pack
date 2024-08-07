import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import { SxProps } from "@mui/material/styles"
import startCase from "lodash.startcase"
import React from "react"
import { TextFieldBase } from "./TextFieldBase"

type OnChange = (newValue: number | null) => void

export interface NumberFieldBaseProps {
  name?: string
  value?: number | null
  onChange?: OnChange
  label?: React.ReactNode
  disabled?: boolean
  decimals?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  required?: boolean
  fullWidth?: boolean
  margin?: "none" | "dense" | "normal" | undefined
  size?: "medium" | "small"
  debugNamedInput?: boolean
  min?: number
  max?: number
  setZeroToNull?: boolean
  incrementBy?: number
  sx?: SxProps
}
export const NumberFieldBase = React.forwardRef(
  (
    {
      name,
      decimals = 0,
      min = 0,
      max = 9999999999,
      value: propsValue,
      onChange: propsOnChange,
      debugNamedInput,
      size = "small",
      setZeroToNull,
      incrementBy,
      ...props
    }: NumberFieldBaseProps,
    ref: any
  ) => {
    // manage state if no value and onChange
    const [unmanagedState, setUnmanagedState] = React.useState<number | null>(0)
    const value = propsValue !== undefined ? propsValue : unmanagedState
    const onChange: OnChange =
      propsOnChange !== undefined ? propsOnChange : (x) => setUnmanagedState(x)

    // formatting as they type
    const fmt = (s: string) => {
      const negative = s.substr(0, 1) === "-" && min < 0
      let str = s.replace(/[^\d.]/g, "")
      if (decimals === 0) {
        str = str.replace(/\./g, "")
      }
      let parts = str.split(".")
      if (parts.length > 2) {
        parts = parts.slice(0, 2)
      }
      if (parts.length === 2 && parts[1].length > decimals) {
        parts[1] = parts[1].substr(0, decimals)
      }
      str = parts.join(".")
      return `${negative ? "-" : ""}${str}`
    }

    const toNumber = React.useCallback((v: string | null) => {
      return v === null || v === "-" || isNaN(Number(v)) ? 0 : Number(v)
    }, [])

    const toDisplayString = React.useCallback(
      (v: string) => {
        let newValue = parseFloat(toNumber(v).toFixed(decimals)).toString()
        if (newValue === "0") {
          newValue = ""
        }
        return newValue
      },
      [toNumber, decimals]
    )

    const toDecimal = React.useCallback(
      (v: string) => {
        const x = Math.min(max, Math.max(min, toNumber(v)))
        if (setZeroToNull === true && x === 0) {
          return null
        }
        return Number(x.toFixed(decimals))
      },
      [toNumber, decimals, min, max, setZeroToNull]
    )

    const defaultValue = String(value)

    const [state, setState] = React.useState(toDisplayString(defaultValue))
    React.useEffect(() => {
      setState(toDisplayString(defaultValue))
    }, [defaultValue, toDisplayString])

    React.useEffect(() => {
      setState(toDisplayString(defaultValue))
    }, [defaultValue, toDisplayString])

    const label =
      props.label || (name !== undefined ? startCase(name) : undefined)

    const hiddenInputValue = toDecimal(state)

    // increment / decrement buttons
    const disableIncrement = toNumber(String(value)) === max
    const disableDecrement = toNumber(String(value)) === min
    function handleIncrement() {
      if (incrementBy !== undefined) {
        onChange(toDecimal(String(toNumber(String(value)) + incrementBy)))
      }
    }
    function handleDecrement() {
      if (incrementBy !== undefined) {
        onChange(toDecimal(String(toNumber(String(value)) - incrementBy)))
      }
    }

    return (
      <>
        {name !== undefined ? (
          <input
            type={debugNamedInput ? "text" : "hidden"}
            name={name}
            value={hiddenInputValue === null ? "" : hiddenInputValue}
            onChange={() => {}}
          />
        ) : null}

        <TextFieldBase
          {...props}
          fullWidth={props.fullWidth}
          ref={ref}
          required={props.required}
          label={label}
          disabled={props.disabled}
          value={state}
          onChange={(newValue) => setState(fmt(newValue))}
          onBlur={(e) => onChange(toDecimal(e.currentTarget.value))}
          inputProps={
            decimals === 0
              ? {
                  pattern: "[0-9]*",
                  step: "0.01",
                }
              : undefined
          }
          InputProps={
            incrementBy !== undefined
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="increment"
                        disabled={disableIncrement || props.disabled}
                        size="small"
                        onClick={handleIncrement}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        aria-label="decrement"
                        disabled={disableDecrement || props.disabled}
                        size="small"
                        onClick={handleDecrement}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : undefined
          }
          margin={props.margin}
          size={size}
        />
      </>
    )
  }
)
