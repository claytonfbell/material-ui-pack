import React from "react"

import SubmitButtonExample from "./examples/SubmitButtonExample"
import TextFieldExample from "./examples/TextFieldExample"
import CheckboxExample from "./examples/CheckboxExample"
import SelectComboExample from "./examples/SelectComboExample"
import {
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core"
import SelectCountryExample from "./examples/SelectCountryExample"
import SelectRegionExample from "./examples/SelectRegionExample"
import SelectTimeZoneExample from "./examples/SelectTimeZoneExample"
import SelectExample from "./examples/SelectExample"
import RichTextEditorExample from "./examples/RichTextEditorExample"
import TextEditorExample from "./examples/TextEditorExample"
import DateTimePickerExample from "./examples/DateTimePickerExample"
import { useDarkMode, DarkModeProvider } from "./DarkModeProvider"
import DarkModeToggle from "./DarkModeToggle"

function App() {
  const { createMuiThemeWithDarkMode } = useDarkMode()
  const theme = createMuiThemeWithDarkMode({
    palette: {
      primary: {
        main: "#db544c",
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <CssBaseline />
        <DarkModeToggle />
        <Typography variant="h4">Examples</Typography>
        <TextFieldExample />
        <CheckboxExample />
        <SelectComboExample />
        <SelectCountryExample />
        <SelectRegionExample />
        <SelectTimeZoneExample />
        <SelectExample />
        <RichTextEditorExample />
        <TextEditorExample />
        <DateTimePickerExample />
        <SubmitButtonExample />
      </Container>
    </ThemeProvider>
  )
}

export default () => (
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
)
