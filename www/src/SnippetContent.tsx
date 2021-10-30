import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"

interface Props {
  children: string
}

export default function SnippetContent(props: Props) {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {props.children}
    </SyntaxHighlighter>
  )
}
