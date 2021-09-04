import React from "react"
import {
  DateTimePickerBase,
  DateTimePickerBaseProps,
} from "./DateTimePickerBase"
import { useForm } from "./FormProvider"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DateTimePickerProps = Omit<
  DateTimePickerBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const DateTimePicker = React.forwardRef<
  HTMLDivElement,
  DateTimePickerProps
>((props, ref) => {
  const { getValue, setValue, formProps } = useForm<any>()
  const value = (React.useMemo(() => getValue(props.name), [
    getValue,
    props.name,
  ]) || null) as string | null

  return (
    <DateTimePickerBase
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
