import MUITextField from "@mui/material/TextField/TextField"
import { startCase } from "lodash"
import React from "react"
import InputAdornment from "@mui/material/InputAdornment"
import useTheme from "@mui/material/styles/useTheme"
import useMediaQuery from "@mui/material/useMediaQuery"

type OnChange = (value: string | number) => void
type Value = string | number

export interface CurrencyFieldBaseProps {
  value?: Value
  onChange?: OnChange
  label?: string
  disabled?: boolean
  required?: boolean
  allowNegative?: boolean
  alignRight?: boolean
  numeric?: boolean
  blankZero?: boolean
  inPennies?: boolean
  fullWidth?: boolean
  margin?: "normal" | "none" | "dense" | undefined
  size?: "medium" | "small"
  name?: string
  debugNamedInput?: boolean
  autoDecimal?: boolean
}

export const CurrencyFieldBase = React.forwardRef<
  HTMLDivElement,
  CurrencyFieldBaseProps
>(
  (
    {
      value: propsValue,
      onChange: propsOnChange,
      size = "small",
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    // manage state if no value and onChange
    const [state, setState] = React.useState<Value>("")
    const value = propsValue !== undefined ? propsValue : state
    const onChange: OnChange =
      propsOnChange !== undefined ? propsOnChange : x => setState(x)

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

    const [inputValue, setInputValue] = React.useState<string>(incoming(value))

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

    React.useEffect(() => {
      setInputValue(incoming(value))
    }, [incoming, value])

    React.useEffect(() => {
      if (!hasFocus) {
        if (Number(outgoing(inputValue)) !== Number(value)) {
          onChange(outgoing(inputValue))
        }
      }
    }, [hasFocus, inputValue, outgoing, value, onChange])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      let str = e.target.value
      setInputValue(fmt(str))
    }

    function handleBlur() {
      setHasFocus(false)
      setInputValue(formatBlur(inputValue))
    }

    function handleFocus() {
      setHasFocus(true)
    }

    const fmt = (str: string) => {
      // mobile uses phone numpad input that doesn't include negatives or decimals
      // decimal is auto placed
      if (props.autoDecimal || isXsDown) {
        str = str.replace(/[^\d-]/g, "")
        if (str.length > 2) {
          str = `${str.substr(0, str.length - 2)}.${str.substr(
            str.length - 2,
            2
          )}`
        }
        return str
      }
      // standard entry
      else {
        return str
          .replace(/[^0-9.-]/g, "")
          .replace(/[.]+/g, ".")
          .replace(/[-]+/g, "-")
          .replace(/^(-?[0-9]+)(\.[0-9]{1,2}).*/g, "$1$2")
      }
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

    const label =
      props.label === undefined ? startCase(props.name) : props.label

    const theme = useTheme()
    const isXsDown = useMediaQuery(theme.breakpoints.down("xs"))

    return (
      <>
        {props.name !== undefined ? (
          <input
            type={props.debugNamedInput ? "text" : "hidden"}
            name={props.name}
            value={outgoing(inputValue)}
            onChange={() => {}}
          />
        ) : null}

        <MUITextField
          ref={ref}
          type="text"
          inputProps={{
            pattern: "[0-9]*",
            step: "0.01",
          }}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={props.disabled}
          sx={
            props.alignRight
              ? {
                  "& input": {
                    textAlign: "right",
                  },
                }
              : undefined
          }
          margin={props.margin}
          variant="outlined"
          size={size}
          required={props.required}
          label={label}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          fullWidth={fullWidth}
        />
      </>
    )
  }
)
