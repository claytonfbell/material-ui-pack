import createMuiTheme, {
  Theme,
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React from "react"

type ContextType = {
  darkMode: boolean
  toggleDarkMode: (on: boolean) => void
  createMuiThemeWithDarkMode: (options: ThemeOptions) => Theme
}

const Context = React.createContext<ContextType | undefined>(undefined)
export function useDarkMode() {
  const context = React.useContext(Context)
  if (!context) {
    throw new Error(`useDarkMode must be used within a DarkModeProvider`)
  }
  return context
}

export function DarkModeProvider(props: any) {
  const [savedDarkMode, setSavedDarkMode] = React.useState<string | null>(null)
  const [darkMode, setDarkMode] = React.useState<boolean>(false)
  const osDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [detectCount, setDetectCount] = React.useState(0)

  React.useEffect(() => {
    setSavedDarkMode(window.localStorage.getItem("DARKMODE"))
    setDarkMode(savedDarkMode === "1")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setDarkMode(savedDarkMode === "1")
  }, [savedDarkMode])

  const toggleDarkMode = React.useCallback((on: boolean) => {
    setDarkMode(on)
    window.localStorage.setItem("DARKMODE", on ? "1" : "0")
  }, [])

  // ignore first reading from useMediaQuery
  // use the second reading if not saved mode
  // remove saved mode if any changes detected in os settings
  React.useEffect(() => {
    if (detectCount === 1 && savedDarkMode === null) {
      setDarkMode(osDarkMode)
    } else if (detectCount >= 2) {
      setDarkMode(osDarkMode)
      window.localStorage.removeItem("DARKMODE")
    }
    setDetectCount(detectCount + 1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osDarkMode])

  const createMuiThemeWithDarkMode = React.useCallback(
    (options: ThemeOptions) => {
      return createMuiTheme({
        ...options,
        palette: {
          ...options.palette,
          type: darkMode ? "dark" : "light",
        },
      })
    },
    [darkMode]
  )

  const value = React.useMemo(
    (): ContextType => ({
      darkMode,
      toggleDarkMode,
      createMuiThemeWithDarkMode,
    }),
    [darkMode, toggleDarkMode, createMuiThemeWithDarkMode]
  )
  return <Context.Provider value={value} {...props} />
}
