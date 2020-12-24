import React from "react"

interface Props {
  object: any
}

export function Debug(props: Props) {
  return <pre>{JSON.stringify(props.object, undefined, 2)}</pre>
}
