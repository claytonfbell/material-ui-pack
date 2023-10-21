import TextField, { TextFieldProps } from "@mui/material/TextField"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import startCase from "lodash/startCase"
import React, { useEffect } from "react"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CurrencyFieldBaseProps = Omit<
  TextFieldProps,
  "onChange" | "value"
> & {
  allowNegative?: boolean
  autoDecimal?: boolean
  currency?: string
  inPennies?: boolean
  onChange: (value: number) => void
  value: number
}

export const CurrencyFieldBase = React.forwardRef<
  HTMLDivElement,
  CurrencyFieldBaseProps
>((originalProps, ref) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const {
    onChange,
    value,
    allowNegative = false,
    autoDecimal = isMobile,
    inPennies = false,
    currency,
    ...props
  } = originalProps

  function incoming(v: number): string {
    return inPennies ? (v / 100).toFixed(2) : v.toFixed(2)
  }
  function outgoing(v: string): number {
    v = Number(v).toFixed(2)
    if (inPennies) {
      v = v.replace(/\./g, "")
    }
    return Number(v)
  }

  const [inputState, setInputState] = React.useState<string>(
    incoming(value || 0)
  )

  const [hasFocus, setHasFocus] = React.useState(false)

  // update inputState when value changes if not focused
  useEffect(() => {
    if (!hasFocus) {
      setInputState(incoming(value || 0))
    }
  }, [value, hasFocus])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.value
    // strip out all non-numeric characters
    newValue = newValue.replace(/[^0-9.-]/g, "")

    // only allow negative as first character when allowNegative is true
    if (allowNegative) {
      if (newValue.length > 0 && newValue[0] === "-") {
        newValue = "-" + newValue.replace(/-/g, "")
      } else {
        newValue = newValue.replace(/-/g, "")
      }
    } else {
      newValue = newValue.replace(/-/g, "")
    }

    // only allow 1 decimal point
    let parts = newValue.split(".")
    if (parts.length > 2) {
      newValue = parts[0] + "." + parts[1]
    }

    // auto add decimal if autoDecimal is true
    if (autoDecimal) {
      newValue = newValue.replace(/\./g, "")
      newValue = newValue.padStart(3, "0")
      newValue = Number(newValue.slice(0, -2)) + "." + newValue.slice(-2)
    }

    // cents can only be 2 digits
    parts = newValue.split(".")
    if (parts.length > 1) {
      let cents = parts[1]
      cents = cents.slice(0, 2)
      newValue = parts[0] + "." + cents
    }

    setInputState(newValue)

    const x = outgoing(newValue)
    if (x !== value) {
      onChange(x)
    }
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    setHasFocus(true)
    if (props.onFocus !== undefined) {
      props.onFocus(event)
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    let newValue = event.target.value
    newValue = Number(newValue).toFixed(2)
    setInputState(newValue)
    setHasFocus(false)

    // run the original onBlur if it was passed
    if (props.onBlur !== undefined) {
      props.onBlur(event)
    }
  }

  const label =
    props.name !== undefined && props.label === undefined
      ? startCase(props.name)
      : props.label

  return (
    <TextField
      label={label}
      inputMode="decimal"
      {...props}
      ref={ref}
      value={inputState}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        // add the currency symbol as a start adornment if currency is defined
        startAdornment:
          currency !== undefined ? getCurrencySymbol(currency) : undefined,
        ...props.InputProps,
      }}
      inputProps={{
        pattern: "^([-0-9.]+)",
        step: "0.01",
        ...props.inputProps,
        sx: {
          // right align the text by default
          textAlign: "right",
          ...props.inputProps?.sx,
        },
      }}
    />
  )
})

function getCurrencySymbol(currency: string) {
  // use Intl to get the currency symbol
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const parts = formatter.formatToParts(0)
  const currencySymbol = parts.find((part) => part.type === "currency")?.value
  return currencySymbol
}
