# material-ui-pack

[![npm version](https://badge.fury.io/js/material-ui-pack.svg)](https://badge.fury.io/js/material-ui-pack)
[![Build Status](https://travis-ci.org/claytonfbell/material-ui-pack.svg?branch=master)](https://travis-ci.org/claytonfbell/material-ui-pack)

Why? I have a few React / Material UI projects, and find it very verbose to create forms so I created this reusable package of components.

```javascript
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
} from "material-ui-pack"

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

        <br />
        <br />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Container>
  )
}

export default App
```
