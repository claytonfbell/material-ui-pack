import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { DarkModeToggle, DarkModeProvider, useDarkMode } from "material-ui-pack"
import React from "react"

function DarkModeExampleContent() {
  const { createMuiThemeWithDarkMode } = useDarkMode()
  const theme = createMuiThemeWithDarkMode({})

  return (
    <ThemeProvider theme={theme}>
      <DarkModeToggle labelOff="Dark Mode is OFF" labelOn="Dark Mode is ON" />
      <Paper>
        <Box padding={6}>
          <Typography>Hello World</Typography>
        </Box>
      </Paper>
    </ThemeProvider>
  )
}

export function DarkModeExample() {
  return (
    <DarkModeProvider>
      <DarkModeExampleContent />
    </DarkModeProvider>
  )
}
