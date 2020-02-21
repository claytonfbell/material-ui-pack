import { FormControlLabel } from "@material-ui/core"
import MUICheckbox, { CheckboxProps } from "@material-ui/core/Checkbox"
import startCase from "lodash/startCase"
import React from "react"
import { useForm } from "./FormProvider"

export interface FormCheckboxProps extends CheckboxProps {
  name: string
  label?: string
}
function Checkbox(props: FormCheckboxProps) {
  const {
    formProps: { busy },
    getValue,
    setValue,
  } = useForm()
  const checked = getValue(props.name) as boolean
  const label = props.label === undefined ? startCase(props.name) : props.label
  let { name, ...newProps }: CheckboxProps = {
    ...props,

    checked,
    onChange: e => setValue(props.name, e.currentTarget.checked),
    disabled: busy || props.disabled,
  }
  return (
    <FormControlLabel label={label} control={<MUICheckbox {...newProps} />} />
  )
}

export default Checkbox
