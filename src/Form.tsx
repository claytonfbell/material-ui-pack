import { PropTypes } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { Debug } from "./Debug"
import { FormFields, FormLayout, FormSchema } from "./FormFields"
import { FieldSizeType, FormProvider } from "./FormProvider"

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}))

export interface FormProps<T> {
  children?: React.ReactNode
  onSubmit: () => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
  pleaseWaitLabel?: string
  state: T
  setState: React.Dispatch<React.SetStateAction<T>>
  busy?: boolean
  debug?: boolean
  margin?: PropTypes.Margin
  size?: FieldSizeType
  preventSubmitOnEnterKey?: boolean
  schema?: FormSchema<T>
  layout?: FormLayout<T>
  buttons?: boolean
}

function FormComponent<T extends object>({ ...props }: FormProps<T>) {
  const classes = useStyles(props)

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={e => {
        e.preventDefault()
        props.onSubmit()
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
      {props.children}
      <FormFields />
    </form>
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
