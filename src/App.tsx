import React from "react"

import SubmitButtonExample from "./examples/SubmitButtonExample"
import TextFieldExample from "./examples/TextFieldExample"
import CheckboxExample from "./examples/CheckboxExample"
import SelectComboExample from "./examples/SelectComboExample"
import { Typography, Container, CssBaseline } from "@material-ui/core"
import SelectCountryExample from "./examples/SelectCountryExample"
import SelectRegionExample from "./examples/SelectRegionExample"
import SelectTimeZoneExample from "./examples/SelectTimeZoneExample"
import SelectExample from "./examples/SelectExample"
import RichTextEditorExample from "./examples/RichTextEditorExample"
import TextEditorExample from "./examples/TextEditorExample"

function App() {
  return (
    <Container maxWidth="xs">
      <CssBaseline />
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
      {/* <SubmitButtonExample /> */}
    </Container>
  )
}

export default App
