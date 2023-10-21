import TextField, { TextFieldProps } from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import startCase from "lodash/startCase"
import React, { useCallback, useEffect } from "react"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PercentageFieldBaseProps = Omit<
  TextFieldProps,
  "onChange" | "value"
> & {
  allowNegative?: boolean
  value: number
  onChange: OnChange
  decimals?: 2 | 3 | 4 | 5 | 6
}

type OnChange = (newValue: number) => void

export const PercentageFieldBase = React.forwardRef(
  (originalProps: PercentageFieldBaseProps, ref: any) => {
    const {
      onChange,
      value,
      allowNegative = false,
      decimals = 2,
      ...props
    } = originalProps

    const incoming = useCallback(
      (v: number) => {
        return (v * 100).toFixed(decimals - 2).replace(/-/g, "")
      },
      [decimals]
    )

    function outgoing(v: string, isNegative: boolean): number {
      v = (Number(v) / 100).toFixed(decimals)
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
      if (event.key === "-") {
        event.preventDefault()
        if (!allowNegative) {
          return
        }
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
    const pattern = !allowNegative && decimals === 2 ? "[0-9]*" : undefined

    return (
      <>
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
            startAdornment:
              allowNegative && isNegative ? (
                <Typography
                  sx={{
                    color: isNegative ? "red" : undefined,
                  }}
                >
                  -
                </Typography>
              ) : undefined,
            endAdornment: (
              <Typography
                sx={{
                  color: isNegative ? "red" : undefined,
                }}
              >
                %
              </Typography>
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
              color: isNegative ? "red" : undefined,
              ...props.inputProps?.sx,
            },
          }}
        />
      </>
    )
  }
)
