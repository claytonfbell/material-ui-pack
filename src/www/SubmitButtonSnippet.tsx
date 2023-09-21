import React from "react"
import { Snippet } from "./Snippet"

export function SubmitButtonSnippet() {
  const codeString = `
  import { CancelButton, Form, SubmitButton } from "material-ui-pack"
  import React, { useState } from "react"
  
  export function SubmitButtonExample() {
    const [state, setState] = useState({
      foo: "",
    })
    const [busy, setBusy] = useState(false)
    return (
      <Form
        state={state}
        setState={setState}
        busy={busy}
        onSubmit={() => setBusy(true)}
      >
        <SubmitButton>Save</SubmitButton>
        <CancelButton onClick={() => setBusy(false)}>Cancel</CancelButton>
      </Form>
    )
  }
    
`
  return <Snippet>{codeString}</Snippet>
}
