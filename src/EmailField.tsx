import React, { useState } from "react"
import { useForm } from "./FormProvider"
import SelectCombo from "./SelectCombo"

interface EmailFieldProps {
  name: string
  label?: string
  disabled?: boolean
}
export default function EmailField(props: EmailFieldProps) {
  const { getValue } = useForm()
  const value = getValue(props.name) as string
  const [state, setState] = useState(value)

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
        .map(provider => {
          const email = `${firstPart}@${provider}`
          return { value: email, label: email }
        })
        .filter(o => o.value !== state),
    ]
  }

  return (
    <SelectCombo
      name={props.name}
      label={props.label}
      disabled={props.disabled}
      options={getOptions()}
      autoComplete="email"
      onInputChange={e => setState(e.currentTarget.value)}
    />
  )
}
