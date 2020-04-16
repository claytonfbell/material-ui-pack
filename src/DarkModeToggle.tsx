import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import Switch from "@material-ui/core/Switch"
import React from "react"
import { useDarkMode } from "./DarkModeProvider"

interface Props {
  labelOn?: string
  labelOff?: string
}

export default function DarkModeToggle(props: Props) {
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
