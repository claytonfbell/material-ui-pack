import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
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
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  )
}
