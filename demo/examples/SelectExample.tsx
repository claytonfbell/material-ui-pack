import React from "react"
import { Form, Select, SelectBase } from "material-ui-pack"

export function SelectExample() {
  const [state, setState] = React.useState({ color: undefined })
  const [busy, setBusy] = React.useState(false)

  const [value, setValue] = React.useState(1)

  return (
    <>
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

      <SelectBase
        value={value}
        onChange={x => setValue(x as number)}
        isNumeric
        options={[
          { value: 1, label: "One" },
          { value: 2, label: "Two" },
        ]}
      />
    </>
  )
}
