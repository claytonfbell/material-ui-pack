import { Grid } from "@material-ui/core"
import { Form, TextField } from "material-ui-pack"
import React, { useState } from "react"
import { DebugBox } from "./DebugBox"

export function TextFieldExample() {
  const [state, setState] = useState({
    capitalize: "",
    phone: "",
    lowercase: "",
    password: "",
    newPassword: "",
    customFormat: "",
  })

  const [busy, setBusy] = useState(false)

  return (
    <Form
      state={state}
      setState={setState}
      busy={busy}
      onSubmit={() => setBusy(true)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DebugBox object={state} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField formatter="capitalize" name="capitalize" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField formatter="phone" name="phone" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField formatter="lowercase" name="lowercase" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField formatter="password" name="password" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField formatter="newPassword" name="newPassword" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            formatter={str =>
              Array.from(str)
                .map((x, i) =>
                  i % 2 !== 0 ? x.toUpperCase() : x.toLowerCase()
                )
                .join("")
            }
            name="customFormat"
          />
        </Grid>
      </Grid>
    </Form>
  )
}
