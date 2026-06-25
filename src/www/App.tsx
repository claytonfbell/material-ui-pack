import GitHubIcon from "@mui/icons-material/GitHub"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { ThemeProvider } from "@mui/material/styles"
import React from "react"
import {
  DarkModeProvider,
  DarkModeToggle,
  Spacer,
  useDarkMode,
} from "../index-package"
// import "./App.css"
import { Paper } from "@mui/material"
import Stack from "@mui/material/Stack"
import { CheckboxExample } from "./CheckboxExample"
import { CheckboxSnippet } from "./CheckboxSnippet"
import { DarkModeExample } from "./DarkModeExample"
import { DarkModeSnippet } from "./DarkModeSnippet"
import { DateExample } from "./DateExample"
import { DateSnippet } from "./DateSnippet"
import { ExampleBox } from "./ExampleBox"
import { FormExample } from "./FormExample"
import { FormHookExample } from "./FormHookExample"
import { FormHookSnippet } from "./FormHookSnippet"
import { FormSnippet } from "./FormSnippet"
import { NumbersExample } from "./NumbersExample"
import { NumbersSnippet } from "./NumbersSnippet"
import { ResponsiveTableExample } from "./ResponsiveTableExample"
import { ResponsiveTableSnippet } from "./ResponsiveTableSnippet"
import { SelectExample } from "./SelectExample"
import { SelectSnippet } from "./SelectSnippet"
import { SubmitButtonExample } from "./SubmitButtonExample"
import { SubmitButtonSnippet } from "./SubmitButtonSnippet"
import { TextFieldExample } from "./TextFieldExample"
import { TextFieldSnippet } from "./TextFieldSnippet"

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
    // typography: {
    //   //   htmlFontSize: 10,
    // },
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <CssBaseline />

        <br />
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid>
            <Typography variant="h3" component="h1" color="dark">
              material-ui-pack
            </Typography>
            <br />
            <Paper
              variant="outlined"
              sx={{
                padding: 2,
              }}
            >
              <Stack spacing={2}>
                <a href="https://badge.fury.io/js/material-ui-pack">
                  <img
                    src="https://badge.fury.io/js/material-ui-pack.svg"
                    alt="npm version"
                    width={126}
                    height={20}
                  />
                </a>
                <InstallInstruction version="9" />
                <InstallInstruction version="7" />
                <InstallInstruction version="6" />
                <InstallInstruction version="5" />
              </Stack>
            </Paper>
            <br />
            <br />
            <DarkModeToggle variant="icon" />
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
        <ExampleBox title="Form" snippet={<FormSnippet />}>
          <FormExample />
        </ExampleBox>

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

function InstallInstruction({ version }: { version: string }) {
  return (
    <Stack>
      <Typography>
        <strong>Install for MUI v{version}</strong>
      </Typography>
      <code>npm install material-ui-pack@{version}</code>
    </Stack>
  )
}
