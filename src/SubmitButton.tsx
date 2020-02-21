import Button, { ButtonProps } from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
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
    children: busy ? (
      <>
        Please Wait...{" "}
        <CircularProgress
          style={{ marginLeft: 14 }}
          size={14}
          color="primary"
        />
      </>
    ) : (
      props.children
    ),
  }
  return <Button {...newProps} />
}
