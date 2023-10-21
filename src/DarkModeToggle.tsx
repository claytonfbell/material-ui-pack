import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import React from "react"
import { useDarkMode } from "./DarkModeProvider"
import Tooltip from "@mui/material/Tooltip"

interface Props {
  labelOn?: string
  labelOff?: string
  variant?: "switch" | "icon"
}

export function DarkModeToggle(props: Props) {
  const {
    labelOn = "Dark Mode On",
    labelOff = "Dark Mode Off",
    variant = "switch",
  } = props
  const { darkMode, toggleDarkMode } = useDarkMode()

  const toggleChecked = () => {
    toggleDarkMode(!darkMode)
  }

  return variant === "switch" ? (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={toggleChecked} />}
        label={darkMode ? labelOn : labelOff}
      />
    </FormGroup>
  ) : variant === "icon" ? (
    <Tooltip title={!darkMode ? labelOff : labelOn}>
      <IconButton onClick={() => toggleChecked()}>
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  ) : null
}
