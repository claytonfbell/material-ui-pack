import createMuiTheme, {
  Theme,
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export interface DarkModeContextProps {
  darkMode: boolean
  toggleDarkMode: (on: boolean) => void
  createMuiThemeWithDarkMode: (options: ThemeOptions) => Theme
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
)
export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error(`useDarkMode must be used within a DarkModeProvider`)
  }
  return context
}

export function DarkModeProvider(props: any) {
  const savedDarkMode = window.localStorage.getItem("DARKMODE")
  const [darkMode, setDarkMode] = useState<boolean>(savedDarkMode === "1")
  const osDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [detectCount, setDetectCount] = useState(0)

  const toggleDarkMode = useCallback((on: boolean) => {
    setDarkMode(on)
    window.localStorage.setItem("DARKMODE", on ? "1" : "0")
  }, [])

  // ignore first reading from useMediaQuery
  // use the second reading if not saved mode
  // remove saved mode if any changes detected in os settings
  useEffect(() => {
    if (detectCount === 1 && savedDarkMode === null) {
      setDarkMode(osDarkMode)
    } else if (detectCount >= 2) {
      setDarkMode(osDarkMode)
      window.localStorage.removeItem("DARKMODE")
    }
    setDetectCount(detectCount + 1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osDarkMode])

  const createMuiThemeWithDarkMode = useCallback(
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

  const value = useMemo(
    () => ({
      darkMode,
      toggleDarkMode,
      createMuiThemeWithDarkMode,
    }),
    [darkMode, toggleDarkMode, createMuiThemeWithDarkMode]
  )
  return <DarkModeContext.Provider value={value} {...props} />
}
