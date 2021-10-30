import React from "react"
import { Snippet } from "./Snippet"

export function TextFieldSnippet() {
  const codeString = `
  import { Form, TextField } from "material-ui-pack"
  import React, { useState } from "react"
  
  export function TextFieldExample() {
    const [state, setState] = useState({
      capitalize: "",
      phone: "",
      lowercase: "",
      password: "",
      newPassword: "",
      customFormat: "",
    })
  
    const [busy, setBusy] = useState(false)
  
    return (
      <Form
        state={state}
        setState={setState}
        busy={busy}
        onSubmit={() => setBusy(true)}
      >
        <TextField formatter="capitalize" name="capitalize" />
        <TextField formatter="phone" name="phone" />
        <TextField formatter="lowercase" name="lowercase" />
        <TextField formatter="password" name="password" />
        <TextField formatter="newPassword" name="newPassword" />
        <TextField
            formatter={str =>
            Array.from(str)
                .map((x, i) =>
                i % 2 !== 0 ? x.toUpperCase() : x.toLowerCase()
                )
                .join("")
            }
            name="customFormat"
        />
      </Form>
    )
  }
  
`
  return <Snippet>{codeString}</Snippet>
}
