import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
export function FormHookSnippet() {
  const codeString = `
  import { Form, useForm } from "material-ui-pack"
  import React, { useState } from "react"
  import { DebugBox } from "./DebugBox"
  
  interface FormData {
    firstName: string
    lastName: string
  }
  
  export function FormHookExample() {
    const [state, setState] = useState<FormData>({
      firstName: "",
      lastName: "",
    })
  
    return (
      <Form state={state} setState={setState} onSubmit={() => {}}>
        <DebugBox object={state} />
        <CustomComponent name="firstName" />
        <AlternateComponet />
      </Form>
    )
  }
  
  function CustomComponent(props: { name: string }) {
    const { getValue, setValue } = useForm<any>()
    return (
      <input
        style={{ margin: 4, color: "red", backgroundColor: "#bbb", fontSize: 24 }}
        type="text"
        value={getValue(props.name)}
        onChange={e => setValue(props.name, e.target.value)}
      />
    )
  }
  
  function AlternateComponet() {
    const { state, setState } = useForm<FormData>()
    return (
      <input
        style={{ margin: 4, color: "red", backgroundColor: "#bbb", fontSize: 24 }}
        type="text"
        value={state.lastName}
        onChange={e => setState(prev => ({ ...prev, lastName: e.target.value }))}
      />
    )
  }
  
  
  
`
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  )
}