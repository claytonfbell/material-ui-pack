import React from "react"
import { useForm } from "./FormProvider"
import { TimePickerBase, TimePickerBaseProps } from "./TimePickerBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type TimePickerProps = Omit<
  TimePickerBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (props, ref) => {
    const { getValue, setValue, formProps } = useForm<any>()
    const value = (React.useMemo(() => getValue(props.name), [
      getValue,
      props.name,
    ]) || null) as string | null

    return (
      <TimePickerBase
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
