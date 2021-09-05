import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import { ThemeProvider } from "@material-ui/core/styles"
import GitHubIcon from "@material-ui/icons/GitHub"
import { Button, Panel, PanelBody, Typography } from "material-ui-bootstrap"
import {
  DarkModeProvider,
  DarkModeToggle,
  useDarkMode,
  Spacer,
} from "material-ui-pack"
import React from "react"
import "../src/App.css"
import { ExampleBox } from "./ExampleBox"
import { NumbersExample } from "./NumbersExample"
import { NumbersSnippet } from "./NumbersSnippet"
import { SubmitButtonExample } from "./SubmitButtonExample"
import { SubmitButtonSnippet } from "./SubmitButtonSnippet"
import { TextFieldExample } from "./TextFieldExample"
import { TextFieldSnippet } from "./TextFieldSnippet"
import { SelectSnippet } from "./SelectSnippet"
import { SelectExample } from "./SelectExample"
import { CheckboxSnippet } from "./CheckboxSnippet"
import { CheckboxExample } from "./CheckboxExample"
import { ResponsiveTableSnippet } from "./ResponsiveTableSnippet"
import { ResponsiveTableExample } from "./ResponsiveTableExample"
import { DateSnippet } from "./DateSnippet"
import { DateExample } from "./DateExample"
import { DarkModeExample } from "./DarkModeExample"
import { DarkModeSnippet } from "./DarkModeSnippet"
import { FormHookExample } from "./FormHookExample"
import { FormHookSnippet } from "./FormHookSnippet"

function AppContent() {
  const { createMuiThemeWithDarkMode } = useDarkMode()
  const theme = createMuiThemeWithDarkMode({
    palette: {
      primary: {
        main: "#337ab7",
      },
      secondary: {
        main: "#69757d",
      },
    },
    typography: {
      htmlFontSize: 10,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <CssBaseline />

        <br />
        <Grid container justify="space-between">
          <Grid>
            <Typography variant="h3" component="h1" color="dark">
              material-ui-pack
            </Typography>
            <br />
            <Panel color="light">
              <PanelBody>
                <a href="https://badge.fury.io/js/material-ui-pack">
                  <img
                    src="https://badge.fury.io/js/material-ui-pack.svg"
                    alt="npm version"
                  />
                </a>
                &nbsp;
                <a href="https://travis-ci.org/claytonfbell/material-ui-pack">
                  <img
                    src="https://travis-ci.org/claytonfbell/material-ui-pack.svg?branch=master"
                    alt="Build Status"
                  />
                </a>
                <div>
                  <code>npm install material-ui-pack</code>
                </div>
              </PanelBody>
            </Panel>
            <br />
            <br />
            <DarkModeToggle />
          </Grid>
          <Grid>
            <Button
              startIcon={<GitHubIcon />}
              color="secondary"
              variant="contained"
              href="https://github.com/claytonfbell/material-ui-pack"
            >
              GitHub
            </Button>
          </Grid>
        </Grid>
        <Spacer />
        <ExampleBox title="TextField" snippet={<TextFieldSnippet />}>
          <TextFieldExample />
        </ExampleBox>

        <ExampleBox title="Form Buttons" snippet={<SubmitButtonSnippet />}>
          <SubmitButtonExample />
        </ExampleBox>

        <ExampleBox title="Numbers" snippet={<NumbersSnippet />}>
          <NumbersExample />
        </ExampleBox>

        <ExampleBox title="Selects" snippet={<SelectSnippet />}>
          <SelectExample />
        </ExampleBox>

        <ExampleBox title="Checkbox" snippet={<CheckboxSnippet />}>
          <CheckboxExample />
        </ExampleBox>

        <ExampleBox title="Dates / Times" snippet={<DateSnippet />}>
          <DateExample />
        </ExampleBox>

        <ExampleBox title="useForm Hook" snippet={<FormHookSnippet />}>
          <FormHookExample />
        </ExampleBox>

        <ExampleBox title="Dark Mode" snippet={<DarkModeSnippet />}>
          <DarkModeExample />
        </ExampleBox>

        <ExampleBox
          title="ResponsiveTable"
          snippet={<ResponsiveTableSnippet />}
        >
          <ResponsiveTableExample />
        </ExampleBox>
      </Container>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}
