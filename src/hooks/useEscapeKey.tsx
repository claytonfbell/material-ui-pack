import React from "react"

const useEscapeKey = (callback: () => void) => {
  // detect escape keypress
  const escFunction = React.useCallback(
    e => {
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

export default useEscapeKey
