import React from "react"

const SnippetContent = React.lazy(() => import("./SnippetContent"))

interface Props {
  children: string
}

export function Snippet(props: Props) {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <SnippetContent>{props.children}</SnippetContent>
    </React.Suspense>
  )
}
