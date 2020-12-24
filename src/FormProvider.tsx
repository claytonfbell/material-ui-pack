import { cloneDeep, get, set } from "lodash"
import React, { createContext, useCallback, useContext, useMemo } from "react"
import { FormProps } from "./Form"

const _ = { get, set, cloneDeep }

export type FieldSizeType = "small" | "medium" | undefined

export type FormValue = string | number | boolean | null

type FormContextType = {
  formProps: FormProps
  getValue: (name: string) => FormValue
  setValue: (name: string, value: FormValue) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)
export function useForm() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error(`useForm must be used within a FormProvider`)
  }
  return context
}

export function FormProvider(formProps: FormProps) {
  const setValue = useCallback(
    (name: string, value: FormValue) => {
      //   var newState = { ...formProps.state }
      var newState = _.cloneDeep(formProps.state)
      _.set(newState, name as string, value)
      formProps.setState(newState)
    },
    [formProps]
  )

  const getValue = useCallback(
    (name: string) => {
      return _.get(formProps.state, name)
    },
    [formProps.state]
  )

  const value = useMemo(
    () => ({
      formProps,
      getValue,
      setValue,
    }),
    [formProps, getValue, setValue]
  )
  return <FormContext.Provider value={value} {...formProps} />
}
