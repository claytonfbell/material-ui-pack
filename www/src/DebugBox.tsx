import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import { Button } from "material-ui-bootstrap"
import { Debug } from "material-ui-pack"
import { useState } from "react"

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
