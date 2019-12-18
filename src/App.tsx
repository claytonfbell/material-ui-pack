import React, { useState } from "react"
import { Container, CssBaseline } from "@material-ui/core"

import {
  Form,
  SubmitButton,
  TextField,
  SelectCombo,
  SelectCountry,
  SelectRegion,
  SelectTimeZone,
  TextEditor,
} from "./lib"

function App() {
  const [formState, setFormState] = useState({
    normal: "",
    overrideLabel: "",
    email: "",
    password: "",
    newPassword: "",
    phone: "",
    capitalizedWords: "",
    favoriteColor: "",
    yourCountry: "",
    stateOrProvince: "",
    markdownContent: "",
  })

  function handleSubmit() {
    alert(JSON.stringify(formState))
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Form
        state={formState}
        setState={setFormState}
        onSubmit={handleSubmit}
        margin="dense"
        size="small"
        debug
      >
        <TextField name="normal" />
        <TextField name="overrideLabel" label="My Custom Label" />
        <TextField name="email" email />
        <TextField name="password" password />
        <TextField name="newPassword" newPassword />
        <TextField name="phone" phone />
        <TextField name="capitalizedWords" capitalize />
        <SelectCombo
          options={[
            { value: "blue", label: "Blue" },
            { value: "red", label: "Red" },
          ]}
          name="favoriteColor"
        />
        <SelectCountry name="yourCountry" />
        <SelectRegion country={formState.yourCountry} name="stateOrProvince" />
        <SelectTimeZone name="timeZone" />
        <TextEditor name="markdownContent" />

        <br />
        <br />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Container>
  )
}

export default App
