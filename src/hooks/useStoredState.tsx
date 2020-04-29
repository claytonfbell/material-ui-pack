import React from "react"

/**
 * Hook to persist state to localStorage in browser
 * @param storeKeyName
 * @param defaultValue
 */

const KEY = "stored-state"

export default function useStoredState<T>(
  storeKeyName: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState<T>(defaultValue)

  React.useEffect(() => {
    const json = localStorage.getItem(KEY)
    const obj: any = json === null ? {} : JSON.parse(json)
    setState(storeKeyName in obj ? obj[storeKeyName] : defaultValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const json = localStorage.getItem(KEY)
    const obj: any = json === null ? {} : JSON.parse(json)
    obj[storeKeyName] = state
    localStorage.setItem(KEY, JSON.stringify(obj))
  }, [state, storeKeyName])
  return [state, setState]
}
