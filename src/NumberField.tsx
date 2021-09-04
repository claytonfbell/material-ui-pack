import React from "react"
import { useForm } from "./FormProvider"
import { NumberFieldBase, NumberFieldBaseProps } from "./NumberFieldBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type NumberFieldProps = Omit<
  NumberFieldBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const NumberField = React.forwardRef(
  (props: NumberFieldProps, ref: any) => {
    const { getValue, setValue, formProps } = useForm<any>()

    const value = (React.useMemo(() => getValue(props.name), [
      getValue,
      props.name,
    ]) || 0) as number

    return (
      <>
        <NumberFieldBase
          {...props}
          ref={ref}
          value={value}
          onChange={x => setValue(props.name, x)}
          margin={formProps.margin}
          size={formProps.size}
          disabled={formProps.busy || props.disabled}
        />
      </>
    )
  }
)
