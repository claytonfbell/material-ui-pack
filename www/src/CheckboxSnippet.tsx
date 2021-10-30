import React from "react"
import { Snippet } from "./Snippet"

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
  return <Snippet>{codeString}</Snippet>
}
