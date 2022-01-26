import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@material-ui/core"
import React from "react"
import {
  DarkModeProvider,
  useDarkMode,
  DarkModeToggle,
  ResponsiveTable,
  Spacer,
  DisplayError,
} from "material-ui-pack"
import { CheckboxExample } from "./CheckboxExample"
import { CurrencyFieldExample } from "./CurrencyFieldExample"
import { DatePickerExample } from "./DatePickerExample"
import { DateTimePickerExample } from "./DateTimePickerExample"
import { DisplayDateTimeExamples } from "./DisplayDateTimeExamples"
import { PercentageFieldExample } from "./PercentageFieldExample"
import { SelectComboExample } from "./SelectComboExample"
import { SelectCountryExample } from "./SelectCountryExample"
import { SelectExample } from "./SelectExample"
import { SubmitButtonExample } from "./SubmitButtonExample"
import { TextFieldExample } from "./TextFieldExample"
import { UseCounterExample } from "./UseCounterExample"
import { UseEscapeKeyExample } from "./UseEscapeKeyExample"
import { UseHandleStateExample } from "./UseHandleStateExample"
import { NumberFieldExample } from "./NumberFieldExample"
import { SchemaExample } from "./SchemaExample"
import { ParentChildFormExample } from "./ParentChildFormExample"

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
        <DisplayError error="Sample error" />
        <SchemaExample />
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
        <NumberFieldExample />
        <UseCounterExample />
        <UseEscapeKeyExample />
        <UseHandleStateExample />
        <ParentChildFormExample />
      </Container>
      <Container maxWidth="md">
        <DisplayDateTimeExamples />
      </Container>

      <Spacer size={4} />
      <Container>
        <ResponsiveTable
          onSelectChange={film => {
            console.log(film)
          }}
          onEdit={film => alert(`Edit ${film.title}`)}
          onDelete={film => alert(`Delete ${film.title}`)}
          selectionDisabled={film => film.id === 2}
          rowData={[
            { id: 1, title: "Star Wars", category: "Sci-Fi" },
            { id: 2, title: "The Shining", category: "Horror" },
          ]}
          schema={[
            {
              label: "Title",
              render: function(item) {
                return item.title
              },
            },
            {
              xsDownHidden: true,
              label: "Category",
              render: function(item) {
                return item.category
              },
            },
          ]}
        />
      </Container>
      <Spacer size={4} />

      <br />
      <br />
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
