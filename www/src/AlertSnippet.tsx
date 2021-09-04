import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
export default function AlertSnippet() {
  const codeString = `
  import React from "react"
  import { Alert } from "material-ui-bootstrap"
  
  export default function AlertExample() {
    return (
        <Alert color="danger" dismissible >
            This is a dismissable one.
        </Alert>
    )
  }
`
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  )
}
