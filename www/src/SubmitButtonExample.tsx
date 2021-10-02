import { Grid } from "@mui/material"
import { CancelButton, Form, SubmitButton } from "material-ui-pack"
import React, { useState } from "react"

export function SubmitButtonExample() {
  const [state, setState] = useState({
    foo: "",
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
        <Grid item xs={6} sm={4}>
          <SubmitButton>Save</SubmitButton>
        </Grid>
        <Grid item xs={6} sm={4}>
          <CancelButton onClick={() => setBusy(false)}>Cancel</CancelButton>
        </Grid>
      </Grid>
    </Form>
  )
}
