import { Button } from "material-ui-bootstrap"
import { ButtonProps } from "material-ui-bootstrap/dist/Button"
import React from "react"

export const CancelButton = React.forwardRef<HTMLDivElement, ButtonProps>(
  (props, ref) => {
    const newProps: ButtonProps = {
      variant: "outlined",
      fullWidth: true,
      children: props.children === undefined ? `Cancel` : props.children,
      ...props,
    }
    return <Button {...newProps} ref={ref} />
  }
)
