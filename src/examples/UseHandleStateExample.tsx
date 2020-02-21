import Button from "@material-ui/core/Button"
import Collapse from "@material-ui/core/Collapse"
import React from "react"
import useHandleState from "../hooks/useHandleState"

function UseHandleStateExample() {
  const [isOpen, handleIsOpen, setIsOpen] = useHandleState(true)

  return (
    <Collapse in={isOpen}>
      <Button onClick={() => setIsOpen(false)}>Hide with Setter</Button>
      <Button onClick={handleIsOpen(false)}>Hide with Handler</Button>
    </Collapse>
  )
}

export default UseHandleStateExample
