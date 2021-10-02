import Button, { ButtonProps } from "@mui/material/Button"
import React from "react"
import { useForm } from "./FormProvider"

export const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      formProps: {
        busy,
        submitLabel = "Submit",
        pleaseWaitLabel = "Please Wait",
        disabledSubmitButton = false,
      },
    } = useForm()

    const newProps: ButtonProps = {
      type: "submit",
      variant: "contained",
      fullWidth: true,
      color: "primary",
      ...props,
      disabled: props.disabled || busy || disabledSubmitButton,
      children: busy ? (
        <>{pleaseWaitLabel}... </>
      ) : props.children === undefined ? (
        submitLabel
      ) : (
        props.children
      ),
    }
    return <Button {...newProps} ref={ref} />
  }
)
