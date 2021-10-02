import Button, { ButtonProps } from "@mui/material/Button"
import React from "react"
import { useForm } from "./FormProvider"

export const CancelButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      formProps: { cancelLabel = "Cancel" },
    } = useForm<any>()

    const newProps: ButtonProps = {
      variant: "outlined",
      fullWidth: true,
      children: props.children === undefined ? cancelLabel : props.children,
      ...props,
    }
    return <Button {...newProps} ref={ref} />
  }
)
