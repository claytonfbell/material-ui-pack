import {
  IconButton,
  InputAdornment,
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@material-ui/core"
import { startCase } from "lodash"
import React from "react"
import { useForm } from "."
import PhoneIcon from "@material-ui/icons/Phone"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type TextFieldProps = Omit<MUITextFieldProps, "name"> & {
  name: string
  formatter?:
    | StringFormatter
    | "capitalize"
    | "lowercase"
    | "phone"
    | "newPassword"
    | "password"
}

type StringFormatter = (str: string) => string

const formatters = {
  capitalize: (str: string) =>
    str
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
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
}

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (originalProps, ref) => {
    const { formatter, ...props } = originalProps
    const { formProps, getValue, setValue } = useForm()

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
      }

      if (typeof formatter === "function") {
        newValue = formatter(newValue)
      }
      setValue(props.name, newValue)
    }

    // handleBlur
    function handleBlur(
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      let newValue = e.currentTarget.value
      if (formatter === "phone") {
        newValue = formatters.phoneBlur(newValue)
      }
      setValue(props.name, newValue)
    }

    // password state
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

    // label
    props.label = props.label || startCase(props.name)
    props.label =
      error && errorMessage !== ""
        ? `${props.label} - ${errorMessage}`
        : props.label

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

    // value
    props.value = props.value === undefined ? getValue(props.name) : props.value

    // variant
    props.variant = props.variant || "outlined"

    // margin
    props.margin = props.margin || formProps.margin

    // size
    props.size = props.size || formProps.size

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

    // disabled
    props.disabled = props.disabled || formProps.busy

    // error
    props.error = props.error || error

    // fullWidth
    props.fullWidth = props.fullWidth === undefined ? true : props.fullWidth

    // error state
    React.useEffect(() => {
      const errs = []
      const value = props.value as string
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
    }, [props.value, formatter])

    return (
      <MUITextField
        ref={ref}
        value={props.value}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
