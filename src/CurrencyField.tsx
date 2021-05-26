import React from "react"
import { CurrencyFieldBase, CurrencyFieldBaseProps } from "./CurrencyFieldBase"
import { useForm } from "./FormProvider"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CurrencyFieldProps = Omit<
  CurrencyFieldBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const CurrencyField = React.forwardRef<
  HTMLDivElement,
  CurrencyFieldProps
>((props, ref) => {
  const { getValue, setValue, formProps } = useForm()
  const value = (React.useMemo(() => getValue(props.name), [
    getValue,
    props.name,
  ]) || "") as string | number

  return (
    <CurrencyFieldBase
      {...props}
      ref={ref}
      value={value}
      onChange={x => setValue(props.name, x)}
      margin={formProps.margin}
      size={formProps.size}
      disabled={formProps.busy || props.disabled}
    />
  )
})
