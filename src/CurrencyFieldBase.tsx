import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
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
    return (inPennies ? (v / 100).toFixed(2) : v.toFixed(2)).replace(/-/g, "")
  }
  function outgoing(v: string, isNegative: boolean): number {
    v = Number(v).toFixed(2)
    if (inPennies) {
      v = v.replace(/\./g, "")
    }
    let x = Number(v)
    return allowNegative && isNegative ? -x : x
  }

  const [inputState, setInputState] = React.useState<string>(
    incoming(value || 0)
  )
  const [isNegative, setIsNegative] = React.useState<boolean>(value < 0)

  const [hasFocus, setHasFocus] = React.useState(false)

  // update inputState when value changes if not focused
  useEffect(() => {
    if (!hasFocus) {
      setInputState(incoming(value))
    }
    setIsNegative(value < 0)
  }, [value, hasFocus])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.value
    // strip out all non-numeric characters
    newValue = newValue.replace(/[^0-9.]/g, "")

    // only allow 1 decimal point
    let parts = newValue.split(".")
    if (parts.length > 2) {
      newValue = parts[0] + "." + parts[1]
    }

    // auto add decimal if autoDecimal is true
    if (autoDecimal) {
      newValue = newValue.replace(/\./g, "")
      newValue = newValue.padStart(3, "0")
      let dollars = newValue.slice(0, -2)
      dollars = dollars.replace(/^0+/, "")
      newValue = dollars + "." + newValue.slice(-2)
    }

    // cents can only be 2 digits
    parts = newValue.split(".")
    if (parts.length > 1) {
      let cents = parts[1]
      cents = cents.slice(0, 2)
      newValue = parts[0] + "." + cents
    }

    setInputState(newValue)

    const x = outgoing(newValue, isNegative)
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
    setInputState(incoming(value))
    setHasFocus(false)

    // run the original onBlur if it was passed
    if (props.onBlur !== undefined) {
      props.onBlur(event)
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // if they press minus, toggle the negative state
    if (allowNegative && event.key === "-") {
      event.preventDefault()
      setIsNegative(!isNegative)

      const x = outgoing(inputState, !isNegative)
      if (x !== value) {
        onChange(x)
      }

      return
    }

    // run the original onKeyDown if it was passed
    if (props.onKeyDown !== undefined) {
      props.onKeyDown(event)
    }
  }

  const label =
    props.name !== undefined && props.label === undefined
      ? startCase(props.name)
      : props.label

  // mobile keyboard doesn't have a decimal point or negative sign
  // so we need to allow the user to type those characters unless autoDecimal is true and allowNegative is false
  const pattern = !allowNegative && autoDecimal ? "[0-9]*" : undefined

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
      onKeyDown={handleKeyDown}
      InputProps={{
        // add the minus and currency symbol as a start adornment if currency is defined
        startAdornment: (
          <Stack direction="row" spacing={1}>
            {allowNegative && isNegative ? <Box>-</Box> : null}
            {currency !== undefined ? (
              <Box>{getCurrencySymbol(currency)}</Box>
            ) : null}
          </Stack>
        ),
        ...props.InputProps,
      }}
      inputProps={{
        pattern,
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
