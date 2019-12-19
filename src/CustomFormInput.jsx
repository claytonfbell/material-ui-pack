import React from "react"
import { useForm } from "./FormProvider"

export default function CustomFormInput(props) {
  const { formProps, getValue, setValue } = useForm()
  return (
    <input
      type="text"
      disabled={formProps.busy}
      value={getValue(props.name)}
      onChange={e => setValue(props.name, e.currentTarget.value)}
    />
  )
}
