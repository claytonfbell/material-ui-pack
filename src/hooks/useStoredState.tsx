import React from "react"

const KEY = "stored-state"

/**
 * @deprecated use react-storage-hooks instead
 */
export function useStoredState<T>(
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

export function removeStoredState(storeKeyName: string) {
  const json = localStorage.getItem(KEY)
  const obj: any = json === null ? {} : JSON.parse(json)
  delete obj[storeKeyName]
  localStorage.setItem(KEY, JSON.stringify(obj))
}
