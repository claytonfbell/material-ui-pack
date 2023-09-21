import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Debug } from "../index-package"
import React, { useState } from "react"
import Button from "@mui/material/Button"

interface Props {
  object: Object
  defaultOpen?: boolean
}

export function DebugBox(props: Props) {
  const [show, setShow] = useState(props.defaultOpen === true)

  return (
    <Box>
      <Button
        onClick={() => setShow(!show)}
        endIcon={show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        variant={show ? "contained" : "text"}
      >
        Show State
      </Button>
      <Collapse in={show}>
        <Debug object={props.object} />
      </Collapse>
    </Box>
  )
}
