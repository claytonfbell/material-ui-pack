import React from "react"
import { useForm } from "./FormProvider"
import {
  PercentageFieldBase,
  PercentageFieldBaseProps,
} from "./PercentageFieldBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PercentageFieldProps = Omit<
  PercentageFieldBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const PercentageField = React.forwardRef(
  (props: PercentageFieldProps, ref: any) => {
    const { getValue, setValue, formProps } = useForm<any>()

    const value = (React.useMemo(() => getValue(props.name), [
      getValue,
      props.name,
    ]) || 0) as number

    return (
      <PercentageFieldBase
        {...props}
        ref={ref}
        value={value}
        onChange={x => setValue(props.name, x)}
        margin={formProps.margin}
        size={formProps.size}
        disabled={formProps.busy || props.disabled}
      />
    )
  }
)
