import React from "react"

export default function useHandleState<T>(
  defaultValue: T
): [T, (newValue: T) => () => void, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState<T>(defaultValue)
  const handleState = (newValue: T) => () => setState(newValue)
  return [state, handleState, setState]
}
