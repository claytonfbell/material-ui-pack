import { Button } from "material-ui-bootstrap"
import { ButtonProps } from "material-ui-bootstrap/dist/Button"
import React from "react"
import { useForm } from "./FormProvider"

export const CancelButton = React.forwardRef<HTMLDivElement, ButtonProps>(
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
