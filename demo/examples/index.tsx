import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@material-ui/core"
import React from "react"
import { DarkModeProvider, useDarkMode, DarkModeToggle } from "material-ui-pack"
import { CheckboxExample } from "./CheckboxExample"
import { CurrencyFieldExample } from "./CurrencyFieldExample"
import { DatePickerExample } from "./DatePickerExample"
import { DateTimePickerExample } from "./DateTimePickerExample"
import { DisplayDateTimeExamples } from "./DisplayDateTimeExamples"
import { EmailFieldExample } from "./EmailFieldExample"
import { PercentageFieldExample } from "./PercentageFieldExample"
import { SelectComboExample } from "./SelectComboExample"
import { SelectCountryExample } from "./SelectCountryExample"
import { SelectExample } from "./SelectExample"
import { SubmitButtonExample } from "./SubmitButtonExample"
import { TextFieldExample } from "./TextFieldExample"
import { UseCounterExample } from "./UseCounterExample"
import { UseEscapeKeyExample } from "./UseEscapeKeyExample"
import { UseHandleStateExample } from "./UseHandleStateExample"
import { UseStoredStateExample } from "./UseStoredStateExample"

function ExamplesContent() {
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

export default function Examples() {
  return (
    <DarkModeProvider>
      <ExamplesContent />
    </DarkModeProvider>
  )
}
