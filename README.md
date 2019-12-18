# material-ui-pack

[![npm version](https://badge.fury.io/js/material-ui-pack.svg)](https://badge.fury.io/js/material-ui-pack)
[![Build Status](https://travis-ci.org/claytonfbell/material-ui-pack.svg?branch=master)](https://travis-ci.org/claytonfbell/material-ui-pack)

Why? I have a few React / Material UI projects, and find it very verbose to create forms so I created this reusable package of components.

## Install

```bash
npm i material-ui-pack

# install peer dependencies
npm i @material-ui/core @material-ui/icons @material-ui/lab
```

## Quick Form

```javascript
import React from "react"
import { Form, SubmitButton, TextField } from "material-ui-pack"

export default function App() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  })
  function handleSubmit() {
    // do something with state
  }
  return (
    <Form state={state} setState={setState} onSubmit={handleSubmit}>
      <TextField name="email" email />
      <TextField name="password" password />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
```

### TextField

```javascript
<TextField name="normal" />
<TextField name="overrideLabel" label="My Custom Label" />
<TextField name="email" email />
<TextField name="password" password />
<TextField name="newPassword" newPassword />
<TextField name="phone" phone />
<TextField name="capitalizedWords" capitalize />
```

### Checkbox

```javascript
<Checkbox name="aCheckbox" />
```

### Selects

```javascript
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
<Select
    name="color"
    options={[
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    ]}
/>
```

### Text Editor (markdown format)

```javascript
<TextEditor name="markdownContent" />
```
