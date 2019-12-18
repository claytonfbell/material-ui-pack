import React, { useContext, useMemo, createContext, useCallback } from "react";
import _ from "lodash";
import { FormProps } from "./Form";

export type FieldSizeType = "small" | "medium" | undefined;

type FormContextType = {
  formProps: FormProps;
  getValue: (name: string) => string;
  setValue: (name: string, value: string) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);
export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(`useForm must be used within a FormProvider`);
  }
  return context;
}

export default function FormProvider(formProps: FormProps) {
  const setValue = useCallback(
    (name: string, value: string) => {
      var newState = { ...formProps.state };
      _.set(newState, name as string, value);
      formProps.setState(newState);
    },
    [formProps]
  );

  const getValue = useCallback(
    (name: string) => {
      return _.get(formProps.state, name);
    },
    [formProps]
  );

  const value = useMemo(
    () => ({
      formProps,
      getValue,
      setValue
    }),
    [formProps, getValue, setValue]
  );
  return <FormContext.Provider value={value} {...formProps} />;
}
