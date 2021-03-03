import { Button } from "material-ui-bootstrap"
import { ButtonProps } from "material-ui-bootstrap/dist/Button"
import React from "react"
import { useForm } from "./FormProvider"

export function SubmitButton(props: ButtonProps) {
  const {
    formProps: { busy },
  } = useForm()

  const newProps: ButtonProps = {
    type: "submit",
    variant: "contained",
    fullWidth: true,
    color: "primary",
    ...props,
    disabled: props.disabled || busy,
    children: busy ? <>Please Wait... </> : props.children,
  }
  return <Button {...newProps} />
}
