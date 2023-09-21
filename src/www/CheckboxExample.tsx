import Grid from "@mui/material/Grid"
import { Checkbox, Form } from "../index-package"
import React, { useState } from "react"
import { DebugBox } from "./DebugBox"

export function CheckboxExample() {
  const [state, setState] = useState({
    checkTheBox: false,
  })

  return (
    <Form state={state} setState={setState} onSubmit={() => {}}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DebugBox object={state} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Checkbox name="checkTheBox" />
        </Grid>
      </Grid>
    </Form>
  )
}
