import React from "react"
import { Debug } from "./Debug"
import { FormFields, FormLayout, FormSchema } from "./FormFields"
import { FieldSizeType, FormProvider } from "./FormProvider"
import { useTheme, styled } from "@mui/material/styles"

const StyledForm = styled("form")``

export type FormSetState<T> =
  | React.Dispatch<React.SetStateAction<T>>
  | React.Dispatch<React.SetStateAction<T | undefined>>

export interface FormProps<T> {
  children?: React.ReactNode
  onSubmit?: () => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
  pleaseWaitLabel?: string
  state: T | undefined
  setState: FormSetState<T>
  busy?: boolean
  debug?: boolean
  margin?: "none" | "dense" | "normal" | undefined
  size?: FieldSizeType
  preventSubmitOnEnterKey?: boolean
  schema?: FormSchema<T>
  layout?: FormLayout<T>
  buttons?: boolean
  error?: string
  disabledSubmitButton?: boolean
}

function FormComponent<T extends object>({ ...props }: FormProps<T>) {
  const theme = useTheme()

  return (
    <StyledForm
      sx={{
        width: "100%",
        marginTop: theme.spacing(1),
      }}
      noValidate
      onSubmit={e => {
        e.preventDefault()
        if (props.onSubmit !== undefined) {
          props.onSubmit()
        }
      }}
      onKeyPress={e => {
        // prevent form submitting on enter key
        if (e.which === 13 && props.preventSubmitOnEnterKey === true) {
          try {
            if (
              // @ts-ignore
              e.target.nodeName.toUpperCase() !== "TEXTAREA" &&
              // @ts-ignore
              e.target.nodeName.toUpperCase() !== "BUTTON"
            ) {
              e.preventDefault()
            }
          } catch (e) {
            // nothing
          }
        }
      }}
    >
      {props.debug === true ? <Debug object={props.state} /> : null}
      {props.state !== undefined && props.children === undefined ? (
        <FormFields />
      ) : null}
      {props.children}
    </StyledForm>
  )
}
export function Form<T extends object>(props: FormProps<T>) {
  return (
    <FormProvider {...props}>
      <FormComponent {...props} />
    </FormProvider>
  )
}

Form.defaultProps = {
  size: "small",
  margin: "none",
  debug: false,
  busy: false,
  buttons: true,
}
