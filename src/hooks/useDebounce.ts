import { useEffect } from "react"

export function useDebounce(
  effect: () => void,
  ms: number,
  deps: ReadonlyArray<unknown>
) {
  useEffect(() => {
    const timeout = setTimeout(effect, ms)
    return () => clearTimeout(timeout)
  }, [deps])
}
