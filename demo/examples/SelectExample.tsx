import React from "react"
import { Form, Select, SelectBase } from "material-ui-pack"

export function SelectExample() {
  const [state, setState] = React.useState({
    color: undefined,
    secondColor: undefined,
  })
  const [busy, setBusy] = React.useState(false)

  const [value, setValue] = React.useState<number | null>()

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

        <Select
          name="secondColor"
          options={[
            { value: 1, label: "Blue" },
            { value: 2, label: "Red" },
            { value: 3, label: "Purple", disabled: true },
          ]}
          nullLabel="No Color"
          isNumeric
        />
      </Form>
      <pre>{JSON.stringify({ value })}</pre>
      <SelectBase
        value={value}
        onChange={x => setValue(x as number | null)}
        isNumeric
        allowNull
        options={[
          { value: 1, label: "One" },
          { value: 2, label: "Two" },
        ]}
      />
    </>
  )
}
