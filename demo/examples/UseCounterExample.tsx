import Add from "@mui/icons-material/Add"
import Remove from "@mui/icons-material/Remove"
import React from "react"
import { useCounter } from "material-ui-pack"
import IconButton from "@mui/material/IconButton"

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
