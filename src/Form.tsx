import { PropTypes } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { Debug } from "./Debug"
import { FieldSizeType, FormProvider } from "./FormProvider"

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}))

export interface FormProps {
  children: React.ReactNode
  onSubmit: () => void
  state: any
  setState: React.Dispatch<React.SetStateAction<any>>
  busy?: boolean
  debug?: boolean
  margin?: PropTypes.Margin
  size?: FieldSizeType
}

function FormComponent(props: FormProps) {
  const classes = useStyles(props)
  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit()
      }}
    >
      {props.debug && <Debug object={props.state} />}
      {props.children}
    </form>
  )
}
export const Form = (props: FormProps) => (
  <FormProvider {...props}>
    <FormComponent {...props} />
  </FormProvider>
)

Form.defaultProps = {
  size: "medium",
  margin: "none",
  debug: false,
  busy: false,
} as Partial<FormProps>
