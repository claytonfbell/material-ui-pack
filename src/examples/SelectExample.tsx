import React from "react"
import Form from "../Form"
import Select from "../Select"

export default function SelectExample() {
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
      <Select
        name="color"
        options={[
          { value: "blue", label: "Blue" },
          { value: "red", label: "Red" },
        ]}
      />
    </Form>
  )
}
