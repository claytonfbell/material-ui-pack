import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
export function CheckboxSnippet() {
  const codeString = `
  import { Grid } from "@material-ui/core"
  import { Checkbox, Form } from "material-ui-pack"
  import React, { useState } from "react"
  
  export function CheckboxExample() {
    const [state, setState] = useState({
      checkTheBox: false,
    })
  
    return (
      <Form state={state} setState={setState} onSubmit={() => {}}>
        <Checkbox name="checkTheBox" />
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
