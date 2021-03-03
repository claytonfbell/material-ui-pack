import { cloneDeep, get, set } from "lodash"
import React from "react"
import { FormProps } from "./Form"

const _ = { get, set, cloneDeep }

export type FieldSizeType = "small" | "medium" | undefined

export type FormValue = string | number | boolean | null

type ContextType = {
  formProps: FormProps
  getValue: (name: string) => FormValue
  setValue: (name: string, value: FormValue) => void
}

const Context = React.createContext<ContextType | undefined>(undefined)
export function useForm() {
  const context = React.useContext(Context)
  if (!context) {
    throw new Error(`useForm must be used within a FormProvider`)
  }
  return context
}

export function FormProvider(formProps: FormProps) {
  const setValue = React.useCallback(
    (name: string, value: FormValue) => {
      //   var newState = { ...formProps.state }
      var newState = _.cloneDeep(formProps.state)
      _.set(newState, name as string, value)
      formProps.setState(newState)
    },
    [formProps]
  )

  const getValue = React.useCallback(
    (name: string) => {
      return _.get(formProps.state, name)
    },
    [formProps.state]
  )

  const value = React.useMemo(
    (): ContextType => ({
      formProps,
      getValue,
      setValue,
    }),
    [formProps, getValue, setValue]
  )
  return <Context.Provider value={value} {...formProps} />
}
