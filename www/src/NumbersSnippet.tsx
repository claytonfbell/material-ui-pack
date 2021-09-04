import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
export function NumbersSnippet() {
  const codeString = `
  import {
    CurrencyField,
    Form,
    NumberField,
    PercentageField,
  } from "material-ui-pack"
  import React, { useState } from "react"
  
  export function NumbersExample() {
    const [state, setState] = useState({
      percentageField: 0.255,
      currencyField: 9.99,
      numberField: 2,
    })
  
    const [busy, setBusy] = useState(false)
  
    return (
      <Form
        state={state}
        setState={setState}
        busy={busy}
        onSubmit={() => setBusy(true)}
      >
        <PercentageField name="percentageField" decimals={3} />
        <CurrencyField name="currencyField" />
        <NumberField name="numberField" incrementBy={1} min={-5} max={50} />
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
