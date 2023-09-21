import React from "react"
import { useForm } from "./index-package"
import { TextFieldBase, TextFieldBaseProps } from "./TextFieldBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type TextFieldProps = Omit<
  TextFieldBaseProps,
  "name" | "value" | "onChange"
> & {
  name: string
}

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  ({ disabled, margin, size, ...props }, ref) => {
    const { formProps, getValue, setValue } = useForm<any>()

    // value
    const value = getValue(props.name) as string

    // disabled
    disabled = disabled || formProps.busy

    // margin
    margin = margin || formProps.margin

    // size
    size = size || formProps.size

    return (
      <TextFieldBase
        {...props}
        ref={ref}
        disabled={disabled}
        margin={margin}
        size={size}
        value={value}
        onChange={(newValue) => setValue(props.name, newValue)}
      />
    )
  }
)
