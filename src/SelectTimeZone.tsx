import React from "react"
import { useForm } from "./FormProvider"
import { SelectValue } from "./SelectBase"
import {
  SelectTimeZoneBase,
  SelectTimeZoneBaseProps,
} from "./SelectTimeZoneBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SelectTimeZoneProps = Omit<
  SelectTimeZoneBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const SelectTimeZone = React.forwardRef<
  HTMLDivElement,
  SelectTimeZoneProps
>((props, ref) => {
  const { getValue, setValue, formProps } = useForm<any>()
  const value = React.useMemo(() => getValue(props.name), [
    getValue,
    props.name,
  ]) as SelectValue

  return (
    <SelectTimeZoneBase
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
