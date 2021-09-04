import Box from "@material-ui/core/Box"
import Collapse from "@material-ui/core/Collapse"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Button } from "material-ui-bootstrap"
import { Debug } from "material-ui-pack"
import React, { useState } from "react"

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
