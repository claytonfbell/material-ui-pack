import React from "react"
import { CheckboxBase, CheckboxBaseProps } from "./CheckboxBase"
import { useForm } from "./FormProvider"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CheckboxProps = Omit<
  CheckboxBaseProps,
  "name" | "value" | "onChange"
> & {
  name: string
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    const { getValue, setValue, formProps } = useForm<any>()
    const value: boolean = React.useMemo(() => getValue(props.name) === true, [
      getValue,
      props.name,
    ])

    return (
      <CheckboxBase
        {...props}
        ref={ref}
        value={value}
        onChange={x => setValue(props.name, x)}
        disabled={formProps.busy || props.disabled}
      />
    )
  }
)
