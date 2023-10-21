import React from "react"
import { Snippet } from "./Snippet"

export function DarkModeSnippet() {
  const codeString = `

import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { DarkModeToggle, DarkModeProvider, useDarkMode } from "../index-package"
import React from "react"
import Stack from "@mui/material/Stack"

function DarkModeExampleContent() {
  const { createMuiThemeWithDarkMode } = useDarkMode()
  const theme = createMuiThemeWithDarkMode({
    typography: {
      htmlFontSize: 10,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Box padding={6}>
          <Stack direction="row" spacing={2}>
            <Box>
              <DarkModeToggle
                labelOff="Dark Mode is OFF"
                labelOn="Dark Mode is ON"
              />
            </Box>
            <Box>
              <DarkModeToggle
                variant="icon"
                labelOff="Dark Mode is OFF"
                labelOn="Dark Mode is ON"
              />
            </Box>
          </Stack>
          <Typography fontSize={48}>Hello World</Typography>
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

  
  
    
`
  return <Snippet>{codeString}</Snippet>
}
