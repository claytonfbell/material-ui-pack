import { Tooltip } from "@material-ui/core"
import React from "react"
import Form from "../Form"
import TextField from "../TextField"

export default function TextFieldExample() {
  const [state, setState] = React.useState({ phone: "", password2: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      debug
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
    >
      <Tooltip title="phone">
        <TextField name="phone" phone />
      </Tooltip>
      <TextField name="password2" password />
    </Form>
  )
}
