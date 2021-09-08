import { Button } from "material-ui-bootstrap"
import { ButtonProps } from "material-ui-bootstrap/dist/Button"
import React from "react"
import { useForm } from "./FormProvider"

export const SubmitButton = React.forwardRef<HTMLDivElement, ButtonProps>(
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
