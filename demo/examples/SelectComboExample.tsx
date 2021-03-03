import React from "react"
import { Form, SelectCombo } from "material-ui-pack"

export function SelectComboExample() {
  const [state, setState] = React.useState({ myInput: "" })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
    >
      <SelectCombo
        options={[
          { value: "blue", label: "Blue" },
          { value: "red", label: "Red" },
        ]}
        name="favoriteColor"
      />
    </Form>
  )
}
