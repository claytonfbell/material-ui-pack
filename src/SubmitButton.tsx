import Button, { ButtonProps } from "material-ui-bootstrap/dist/Button"
import React from "react"
import { useForm } from "./FormProvider"

export default function SubmitButton(props: ButtonProps) {
  const {
    formProps: { busy, size },
  } = useForm()

  const newProps: ButtonProps = {
    type: "submit",
    variant: "contained",
    fullWidth: true,
    color: "primary",
    size: size === "medium" ? "large" : "medium",
    ...props,
    disabled: props.disabled || busy,
    children: busy ? <>Please Wait... </> : props.children,
  }
  return <Button {...newProps} />
}
