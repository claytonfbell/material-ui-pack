import React from "react"
import { useForm } from "./FormProvider"
import { SelectCombo } from "./SelectCombo"

interface EmailFieldProps {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
}
export function EmailField(props: EmailFieldProps) {
  const { getValue } = useForm()
  const value = getValue(props.name) as string
  const [state, setState] = React.useState(value)

  let firstPart =
    state !== null && state !== undefined ? state.split("@")[0] : ""

  function getOptions() {
    if (firstPart === "") {
      return []
    }
    const topProviders = [
      "gmail.com",
      "yahoo.com",
      "aol.com",
      "outlook.com",
      "icloud.com",
      "mail.com",
    ]
    return [
      { value: state, label: state },
      ...topProviders
        .map((provider) => {
          const email = `${firstPart}@${provider}`
          return { value: email, label: email }
        })
        .filter((o) => o.value !== state),
    ]
  }

  return (
    <SelectCombo
      required={props.required}
      name={props.name}
      type={"email"}
      label={props.label}
      disabled={props.disabled}
      options={getOptions()}
      autoComplete="email"
      formatter={(v) => v.toLowerCase()}
      onInputChange={(v) => setState(v)}
    />
  )
}
