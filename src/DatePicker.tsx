import React from "react"
import { DatePickerBase, DatePickerBaseProps } from "./DatePickerBase"
import { useForm } from "./FormProvider"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DatePickerProps = Omit<
  DatePickerBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const { getValue, setValue, formProps } = useForm()
    const value = (React.useMemo(() => getValue(props.name), [
      getValue,
      props.name,
    ]) || null) as string | null

    return (
      <DatePickerBase
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
