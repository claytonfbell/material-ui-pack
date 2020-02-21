import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@material-ui/core"
import React from "react"
import { DarkModeProvider, useDarkMode } from "./DarkModeProvider"
import DarkModeToggle from "./DarkModeToggle"
import CheckboxExample from "./examples/CheckboxExample"
import CurrencyFieldExample from "./examples/CurrencyFieldExample"
import DatePickerExample from "./examples/DatePickerExample"
import DateTimePickerExample from "./examples/DateTimePickerExample"
import DisplayDateTimeExamples from "./examples/DisplayDateTimeExamples"
import EmailFieldExample from "./examples/EmailFieldExample"
import PercentageFieldExample from "./examples/PercentageFieldExample"
import RichTextEditorExample from "./examples/RichTextEditorExample"
import SelectComboExample from "./examples/SelectComboExample"
import SelectCountryExample from "./examples/SelectCountryExample"
import SelectExample from "./examples/SelectExample"
import SubmitButtonExample from "./examples/SubmitButtonExample"
import TextEditorExample from "./examples/TextEditorExample"
import TextFieldExample from "./examples/TextFieldExample"
import UseCounterExample from "./examples/UseCounterExample"
import UseEscapeKeyExample from "./examples/UseEscapeKeyExample"
import UseHandleStateExample from "./examples/UseHandleStateExample"
import UseStoredStateExample from "./examples/UseStoredStateExample"

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
        <SelectExample />
        <RichTextEditorExample />
        <TextEditorExample />
        <DateTimePickerExample />
        <DatePickerExample />
        <SubmitButtonExample />
        <CurrencyFieldExample />
        <PercentageFieldExample />
        <EmailFieldExample />
        <UseStoredStateExample />
        <UseCounterExample />
        <UseEscapeKeyExample />
        <UseHandleStateExample />
      </Container>
      <Container maxWidth="md">
        <DisplayDateTimeExamples />
      </Container>
    </ThemeProvider>
  )
}

export default () => (
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
)
