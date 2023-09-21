import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import {
  Checkbox,
  DatePicker,
  DateTimePicker,
  DisplayDate,
  DisplayDateTime,
  Form,
  MultipleDatePicker,
  TimePicker,
} from "../index-package"
import { useState } from "react"
import { DebugBox } from "./DebugBox"
import React from "react"

export function DateExample() {
  const [state, setState] = useState({
    date: "2021-09-22",
    dateTime: "2021-09-26T19:00:00.000-07:00",
    time: "23:00:00",
    fromNow: true,
    multipleDates: ["2021-11-01"],
  })

  const [open, setOpen] = useState(false)

  return (
    <>
      <Form state={state} setState={setState} onSubmit={() => {}}>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12}>
            <DebugBox object={state} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DateTimePicker name="dateTime" minuteIncrements={5} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker name="date" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimePicker name="time" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>
              <DisplayDateTime
                iso8601={state.dateTime}
                fromNow={state.fromNow}
              />
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
          <Grid item xs={12} sm={4}>
            <Tooltip arrow title="This component is only available in v5">
              <Button onClick={() => setOpen(true)}>
                Select Multiple Dates...
              </Button>
            </Tooltip>
            <MultipleDatePicker
              open={open}
              onClose={() => setOpen(false)}
              dates={state.multipleDates}
              onChange={(multipleDates) =>
                setState((prev) => ({ ...prev, multipleDates }))
              }
            />
          </Grid>
        </Grid>
      </Form>
    </>
  )
}