import React from "react"
import { Snippet } from "./Snippet"

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
  return <Snippet>{codeString}</Snippet>
}
