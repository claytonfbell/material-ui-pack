import { FormControlLabel } from "@mui/material"
import MUICheckbox, {
  CheckboxProps as MUICheckboxProps,
} from "@mui/material/Checkbox"
import { startCase } from "lodash"
import React from "react"

const _ = { startCase }

type Value = boolean
type OnChange = (value: Value) => void

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CheckboxBaseProps = Omit<
  MUICheckboxProps,
  "name" | "value" | "onChange"
> & {
  name?: string
  value: Value
  onChange: OnChange
  label?: React.ReactNode
}

export const CheckboxBase = React.forwardRef(
  (
    { value: propsValue, onChange: propsOnChange, ...props }: CheckboxBaseProps,
    ref: any
  ) => {
    // manage state if no value and onChange
    const [checked, setChecked] = React.useState<Value>(propsValue)
    const onChange: OnChange =
      propsOnChange !== undefined ? propsOnChange : x => setChecked(x)

    React.useEffect(() => {
      setChecked(propsValue)
    }, [propsValue])

    const label =
      props.label === undefined ? _.startCase(props.name) : props.label
    let { name, ...newProps }: MUICheckboxProps = {
      ...props,
      checked,
      onChange: e => onChange(e.currentTarget.checked),
      disabled: props.disabled,
    }
    return (
      <FormControlLabel
        {...(props as any)}
        ref={ref}
        label={label}
        control={<MUICheckbox {...newProps} />}
      />
    )
  }
)
