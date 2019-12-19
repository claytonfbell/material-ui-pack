import React, { useState } from "react"
import { Container, CssBaseline, Typography } from "@material-ui/core"
import CustomFormInput from "./CustomFormInput"

import {
  Form,
  Checkbox,
  Select,
  SubmitButton,
  TextField,
  SelectCombo,
  SelectCountry,
  SelectRegion,
  SelectTimeZone,
  TextEditor,
  DateTimePicker,
  DatePicker,
  TimePicker,
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
    number: 0,
  })

  function handleSubmit() {
    alert(JSON.stringify(formState))
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Examples</Typography>
      <CssBaseline />
      <Form
        state={formState}
        setState={setFormState}
        onSubmit={handleSubmit}
        margin="dense"
        size="medium"
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
        <Checkbox name="aCheckbox" />
        <Select
          name="color"
          options={[
            { value: "blue", label: "Blue" },
            { value: "red", label: "Red" },
          ]}
        />
        <Select
          name="number"
          options={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
          ]}
        />
        <DateTimePicker name="dateAndTime" />
        <DatePicker name="date" />
        <TimePicker name="time" />
        <CustomFormInput name="myCustomFormInput" />

        <br />
        <br />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Container>
  )
}

export default App
