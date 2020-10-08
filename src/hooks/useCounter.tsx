import React from "react"

export function useCounter(
  start: number = 0
): [number, () => void, () => void] {
  const [count, setCount] = React.useState<number>(start)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  return [count, increment, decrement]
}
