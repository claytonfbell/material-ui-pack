import React from "react"
import { Form, Select } from "material-ui-pack"

export function SelectExample() {
  const [state, setState] = React.useState({ color: undefined })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
      debug
    >
      <Select
        name="color"
        options={[
          { value: "blue", label: "Blue" },
          { value: "red", label: "Red" },
          { value: "purple", label: "Purple", disabled: true },
        ]}
        allowNull
        nullLabel="No Color"
        required
      />
    </Form>
  )
}
