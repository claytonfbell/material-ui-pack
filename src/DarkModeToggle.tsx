import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import Switch from "@material-ui/core/Switch"
import React from "react"
import { useDarkMode } from "./DarkModeProvider"

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode()

  const toggleChecked = () => {
    toggleDarkMode(!darkMode)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={toggleChecked} />}
        label={`Dark Mode ${darkMode ? "On" : "Off"}`}
      />
    </FormGroup>
  )
}
