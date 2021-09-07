import React from "react"
import { useForm } from "./FormProvider"
import { SelectValue } from "./SelectBase"
import { SelectRegionBase, SelectRegionBaseProps } from "./SelectRegionBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SelectRegionProps = Omit<
  SelectRegionBaseProps,
  "name" | "value" | "onChange" | "margin" | "size"
> & {
  name: string
}

export const SelectRegion = React.forwardRef<HTMLDivElement, SelectRegionProps>(
  (props, ref) => {
    const { getValue, setValue, formProps } = useForm<any>()
    const value = React.useMemo(() => getValue(props.name), [
      getValue,
      props.name,
    ]) as SelectValue

    return (
      <SelectRegionBase
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
