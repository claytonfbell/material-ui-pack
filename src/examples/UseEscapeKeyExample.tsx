import Collapse from "@material-ui/core/Collapse"
import React from "react"
import { useEscapeKey } from "../lib"

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
