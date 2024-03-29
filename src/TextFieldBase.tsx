import PhoneIcon from "@mui/icons-material/Phone"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import startCase from "lodash.startcase"
import React, { useEffect } from "react"

type OnChange = (value: string) => void

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type TextFieldBaseProps = Omit<TextFieldProps, "value" | "onChange"> & {
  value: string
  onChange: OnChange
  formatter?:
    | StringFormatter
    | "capitalize"
    | "lowercase"
    | "phone"
    | "newPassword"
    | "password"
    | "email"
}

type StringFormatter = (str: string) => string

export const TextFieldBase = React.forwardRef<
  HTMLDivElement,
  TextFieldBaseProps
>((originalProps, ref) => {
  const { formatter, value, onChange, ...props } = originalProps

  // handleChange
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let newValue = e.currentTarget.value
    switch (formatter) {
      case "capitalize":
        newValue = formatters.capitalize(newValue)
        break
      case "lowercase":
        newValue = formatters.lowercase(newValue)
        break
      case "phone":
        newValue = formatters.phone(newValue)
        break
      case "email":
        newValue = formatters.email(newValue)
        break
    }

    if (typeof formatter === "function") {
      newValue = formatter(newValue)
    }
    onChange(newValue)
  }

  // handleBlur
  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let newValue = e.currentTarget.value
    if (formatter === "phone") {
      newValue = formatters.phoneBlur(newValue)
    }
    onChange(newValue)

    if (props.onBlur !== undefined) {
      props.onBlur(e)
    }
  }

  // password state
  const [error, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)

  // label
  props.label = props.label || startCase(props.name)
  props.label =
    error && errorMessage !== "" ? (
      <>
        {props.label} - {errorMessage}
      </>
    ) : (
      props.label
    )

  // autoComplete
  props.autoComplete =
    formatter === "newPassword" ? "new-password" : props.autoComplete
  props.autoComplete =
    formatter === "password" ? "current-password" : props.autoComplete

  // type
  props.type =
    formatter === "newPassword" && !showPassword ? "password" : props.type
  props.type =
    formatter === "password" && !showPassword ? "password" : props.type
  props.type = formatter === "email" ? "email" : props.type

  // variant
  props.variant = props.variant || "outlined"

  // InputProps
  props.InputProps =
    props.InputProps === undefined
      ? formatter === "password" || formatter === "newPassword"
        ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(true)}
                  onMouseDown={() => setShowPassword(false)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }
        : formatter === "phone"
        ? {
            endAdornment: (
              <InputAdornment position="end">
                <PhoneIcon fontSize="inherit" />
              </InputAdornment>
            ),
          }
        : undefined
      : props.InputProps

  // error
  props.error = props.error || error

  // fullWidth
  props.fullWidth = props.fullWidth === undefined ? true : props.fullWidth

  // error state
  useEffect(() => {
    const errs = []
    // check for strong password
    if (formatter === "newPassword") {
      if (value !== undefined && value.length > 0) {
        if (value.length < 8) {
          errs.push("TOO SHORT")
        }
        if (value.length > 256) {
          errs.push("TOO LONG")
        }
        if (value.match(/[A-Z]/) === null) {
          errs.push("UPPERCASE REQUIRED")
        }
        if (value.match(/[a-z]/) === null) {
          errs.push("LOWERCASE REQUIRED")
        }
        if (value.match(/[0-9]/) === null) {
          errs.push("NUMBER REQUIRED")
        }
      }
    }
    if (errs.length > 0) {
      setError(true)
      setErrorMessage(errs[0])
    } else {
      setError(false)
      setErrorMessage("")
    }
  }, [value, formatter])

  return (
    <TextField
      {...props}
      ref={ref}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      inputProps={{
        ...props.inputProps,
        ...(formatter === "phone"
          ? {
              pattern: "[0-9]*",
              step: "0.01",
            }
          : undefined),
      }}
    />
  )
})

// formatter functions
const formatters = {
  capitalize: (str: string) =>
    str
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" "),
  lowercase: (str: string) => str.toLowerCase(),
  phone: (str: string) =>
    str
      .replace(/[^0-9() -]/g, "")
      .replace(/^[^0-9]*([0-9]{3})[^0-9]*([0-9]{1,2})[^0-9]*$/g, "($1) $2")
      .replace(/^[^0-9]*([0-9]{3})[^0-9]*([0-9]{1,3})$/g, "($1) $2")
      .replace(
        /^[^0-9]*([0-9]{3})[^0-9]*([0-9]{3})[^0-9]*([0-9]{1,4}).*$/g,
        "($1) $2-$3"
      ),
  phoneBlur: (v: string) => {
    if (v !== null) {
      v = v.replace(/[^0-9]/g, "")
      v = v.length > 10 ? v.substr(0, 10) : v
      v =
        v.length === 10
          ? `(${v.substr(0, 3)}) ${v.substr(3, 3)}-${v.substr(6, 4)}`
          : v
    }
    return v
  },
  email: (v: string) => {
    const [user, host] = v.toLowerCase().substring(0, 320).split(/@/)
    return `${user.trim()}${host !== undefined ? `@${host.trim()}` : ""}`
  },
}
