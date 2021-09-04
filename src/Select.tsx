import React from "react"
import { useForm } from "./FormProvider"
import { SelectBase, SelectBaseProps, SelectValue } from "./SelectBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CurrencyFieldProps = Omit<
  SelectBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const Select = React.forwardRef<HTMLDivElement, CurrencyFieldProps>(
  (props, ref) => {
    const { getValue, setValue, formProps } = useForm<any>()
    const value = React.useMemo(() => getValue(props.name), [
      getValue,
      props.name,
    ]) as SelectValue

    return (
      <SelectBase
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
