import React from "react"

export function useEscapeKey(callback: () => void) {
  // detect escape keypress
  const escFunction = React.useCallback(
    (e: any) => {
      if (e.keyCode === 27) {
        callback()
      }
    },
    [callback]
  )
  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false)
    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [escFunction])
}
