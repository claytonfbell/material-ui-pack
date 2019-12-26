import React from "react"
import Form from "../Form"
import Select from "../Select"

export default function SelectExample() {
  const [state, setState] = React.useState({ color: null })
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
        ]}
        allowNull
        nullLabel="No Color"
      />
    </Form>
  )
}
