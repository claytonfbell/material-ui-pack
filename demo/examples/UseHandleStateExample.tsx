import React from "react"
import { useHandleState } from "material-ui-pack"
import Collapse from "@mui/material/Collapse"
import Button from "@mui/material/Button"

export function UseHandleStateExample() {
  const [isOpen, handleIsOpen, setIsOpen] = useHandleState(true)

  return (
    <Collapse in={isOpen}>
      <Button onClick={() => setIsOpen(false)}>Hide with Setter</Button>
      <Button onClick={handleIsOpen(false)}>Hide with Handler</Button>
    </Collapse>
  )
}
