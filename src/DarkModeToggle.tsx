import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Switch from "@mui/material/Switch"
import React from "react"
import { useDarkMode } from "./DarkModeProvider"

interface Props {
  labelOn?: string
  labelOff?: string
}

export function DarkModeToggle(props: Props) {
  const { labelOn = "Dark Mode On", labelOff = "Dark Mode Off" } = props
  const { darkMode, toggleDarkMode } = useDarkMode()

  const toggleChecked = () => {
    toggleDarkMode(!darkMode)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={toggleChecked} />}
        label={darkMode ? labelOn : labelOff}
      />
    </FormGroup>
  )
}
