import IconButton from "@material-ui/core/IconButton"
import Add from "@material-ui/icons/Add"
import Remove from "@material-ui/icons/Remove"
import React from "react"
import { useCounter } from "material-ui-pack"

export function UseCounterExample() {
  const [count, increase, decrease] = useCounter(100)
  return (
    <>
      {count}
      <IconButton onClick={increase}>
        <Add />
      </IconButton>
      <IconButton onClick={decrease}>
        <Remove />
      </IconButton>
    </>
  )
}
