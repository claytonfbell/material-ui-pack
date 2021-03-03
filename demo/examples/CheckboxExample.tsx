import { Tooltip } from "@material-ui/core"
import React from "react"
import { Checkbox, Form } from "material-ui-pack"

export function CheckboxExample() {
  const [state, setState] = React.useState({ aCheckbox: true })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
    >
      <Tooltip title="checkbox">
        <Checkbox name="aCheckbox" />
      </Tooltip>
    </Form>
  )
}
