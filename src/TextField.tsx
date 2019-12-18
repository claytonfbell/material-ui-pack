import React, { useState, useEffect } from "react"
import startCase from "lodash/startCase"
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import IconButton from "@material-ui/core/IconButton"
import MUITextField, {
  BaseTextFieldProps,
  TextFieldProps,
} from "@material-ui/core/TextField"

import { useForm } from "./FormProvider"

export interface FormTextFieldProps extends BaseTextFieldProps {
  onBlur?: OutlinedInputProps["onBlur"]
  onChange?: OutlinedInputProps["onChange"]
  onFocus?: OutlinedInputProps["onFocus"]
  InputProps?: Partial<OutlinedInputProps>
  inputProps?: OutlinedInputProps["inputProps"]
  capitalize?: boolean
  email?: boolean
  phone?: boolean
  newPassword?: boolean
  password?: boolean
  formatter?: (str: string) => string
}

export default function TextField(props: FormTextFieldProps) {
  const {
    formProps: { margin, size, busy },
    getValue,
    setValue,
  } = useForm()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // formatters
  let fmt = (v: string) => v
  fmt = props.capitalize
    ? (v: string) =>
        v
          .split(" ")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")
    : fmt
  fmt = props.email ? (v: string) => v.toLowerCase() : fmt
  fmt = props.phone
    ? (v: string) =>
        v
          .replace(/[^0-9() -]/g, "")
          .replace(/^[^0-9]*([0-9]{3})[^0-9]*([0-9]{1,2})[^0-9]*$/g, "($1) $2")
          .replace(/^[^0-9]*([0-9]{3})[^0-9]*([0-9]{1,3})$/g, "($1) $2")
          .replace(
            /^[^0-9]*([0-9]{3})[^0-9]*([0-9]{3})[^0-9]*([0-9]{1,4}).*$/g,
            "($1) $2-$3"
          )
    : fmt
  fmt = props.formatter !== undefined ? props.formatter : fmt

  // blur
  let blur = (v: string) => v
  blur = props.phone
    ? (v: string) => {
        if (v !== null) {
          v = v.replace(/[^0-9]/g, "")
          v = v.length > 10 ? v.substr(0, 10) : v
          v =
            v.length === 10
              ? `(${v.substr(0, 3)}) ${v.substr(3, 3)}-${v.substr(6, 4)}`
              : v
        }
        return v
      }
    : blur

  // label
  let label = props.label
  label =
    label === undefined && props.name !== undefined
      ? startCase(props.name)
      : label
  label =
    label !== undefined && error && errorMessage !== ""
      ? `${label} - ${errorMessage}`
      : label

  // autoComplete
  let autoComplete: string | undefined = undefined
  autoComplete = props.email ? "email" : autoComplete
  autoComplete = props.newPassword ? "new-password" : autoComplete
  autoComplete = props.password ? "current-password" : autoComplete

  // value
  let value = props.name !== undefined ? getValue(props.name) : props.value
  value = value === undefined ? "" : value

  // type
  let type: string | undefined = undefined
  type = props.newPassword && !showPassword ? "password" : type
  type = props.password && !showPassword ? "password" : type

  // reduce props to TextFieldProps
  const {
    capitalize,
    email,
    phone,
    newPassword,
    password,
    formatter,
    ...reduced
  } = props

  const textFieldProps: FormTextFieldProps = {
    // default props
    margin,
    size,
    required: false,
    fullWidth: true,
    variant: "outlined",
    autoComplete,
    type,
    error,
    value,
    onBlur: e =>
      setValue(props.name as string, blur(fmt(e.currentTarget.value))),
    onChange:
      props.name !== undefined
        ? e => setValue(props.name as string, fmt(e.currentTarget.value))
        : undefined,
    InputProps:
      props.password || props.newPassword
        ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(true)}
                  onMouseDown={() => setShowPassword(false)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        : undefined,
    // passed props
    ...reduced,
    // overridden props
    disabled: props.disabled || busy,
    label,
  }

  useEffect(() => {
    const errs = []
    const value = textFieldProps.value as string
    // check for strong password
    if (props.newPassword) {
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
  }, [textFieldProps.value, props.newPassword])

  return <MUITextField {...(textFieldProps as TextFieldProps)} />
}
