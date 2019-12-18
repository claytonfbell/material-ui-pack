import React from "react"

interface DebugProps {
  object: any
}

export default function Debug(props: DebugProps) {
  return <pre>{JSON.stringify(props.object, undefined, 2)}</pre>
}
