import React from "react"
import { useEscapeKey } from "material-ui-pack"
import Collapse from "@mui/material/Collapse"

export function UseEscapeKeyExample() {
  const [isOpen, setIsOpen] = React.useState(true)

  useEscapeKey(
    React.useCallback(() => {
      setIsOpen(false)
    }, [])
  )

  return (
    <Collapse in={isOpen}>
      <h1>ESC to hide this</h1>
    </Collapse>
  )
}
