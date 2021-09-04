import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
export function DateSnippet() {
  const codeString = `
  import { Grid, Typography } from "@material-ui/core"
  import {
    Checkbox,
    DatePicker,
    DateTimePicker,
    DisplayDate,
    DisplayDateTime,
    Form,
    TimePicker,
  } from "material-ui-pack"
  import React, { useState } from "react"
  import { DebugBox } from "./DebugBox"
  
  export function DateExample() {
    const [state, setState] = useState({
      date: "2021-09-22",
      dateTime: "2021-09-26T19:00:00.000-07:00",
      time: "23:00:00",
      fromNow: true,
    })
  
    return (
      <Form state={state} setState={setState} onSubmit={() => {}}>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <DebugBox object={state} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DateTimePicker name="dateTime" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker name="date" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimePicker name="time" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>
              <DisplayDateTime iso8601={state.dateTime} fromNow={state.fromNow} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>
              <DisplayDate ymd={state.date} fromNow={state.fromNow} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Checkbox name="fromNow" />
          </Grid>
        </Grid>
      </Form>
    )
  }
  
  
   
`
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  )
}
