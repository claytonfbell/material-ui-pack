import cloneDeep from "lodash.clonedeep"
import get from "lodash.get"
import set from "lodash.set"
import React from "react"
import { FormProps, FormSetState } from "./Form"

export type FieldSizeType = "small" | "medium" | undefined

export type FormValue = string | number | boolean | null

export type FormContextType<T> = {
  formProps: FormProps<T>
  getValue: (name: keyof T) => T[keyof T] | undefined
  setValue: (name: keyof T, value: FormValue) => void
  state: T | undefined
  setState: FormSetState<T>
}

const Context = React.createContext<FormContextType<any> | undefined>(undefined)
export function useForm<T extends object = any>() {
  const context = React.useContext<FormContextType<T> | undefined>(Context)
  if (!context) {
    throw new Error(`useForm must be used within a FormProvider`)
  }
  return context
}

export function FormProvider<T extends object>(formProps: FormProps<T>) {
  const setValue = React.useCallback(
    (name: keyof T, value: FormValue) => {
      //   var newState = { ...formProps.state }
      var newState = cloneDeep(formProps.state)
      if (newState !== undefined) {
        set(newState, name as string, value)
        formProps.setState(newState)
      }
    },
    [formProps]
  )

  const getValue = React.useCallback(
    (name: keyof T) => {
      return get(formProps.state, name)
    },
    [formProps.state]
  )

  const { state, setState } = formProps

  const value = React.useMemo(
    (): FormContextType<T> => ({
      formProps,
      getValue,
      setValue,
      state,
      setState,
    }),
    [formProps, getValue, setState, setValue, state]
  )
  return <Context.Provider value={value} {...formProps} />
}
