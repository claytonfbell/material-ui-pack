import { FormControlLabel } from "@material-ui/core"
import MUICheckbox, { CheckboxProps } from "@material-ui/core/Checkbox"
import { startCase } from "lodash"
import React from "react"

const _ = { startCase }

type Value = boolean
type OnChange = (value: Value) => void

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type FormCheckboxBaseProps = Omit<
  CheckboxProps,
  "name" | "value" | "onChange"
> & {
  name?: string
  value: Value
  onChange: OnChange
  label?: string
}

export const CheckboxBase = React.forwardRef(
  (
    {
      value: propsValue,
      onChange: propsOnChange,
      ...props
    }: FormCheckboxBaseProps,
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
    let { name, ...newProps }: CheckboxProps = {
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
