import React from "react"
import { Snippet } from "./Snippet"

export function DateSnippet() {
  const codeString = `

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
  import Stack from "@mui/material/Stack"
  
  interface State {
    date: string
    dateClearable: string | null
    dateTime: string
    dateTime2: string | null
    time: string
    time2: string | null
    fromNow: boolean
    multipleDates: string[]
    multipleDates2: string[]
  }
  
  export function DateExample() {
    const [state, setState] = useState<State>({
      date: "2021-09-22",
      dateClearable: null,
      dateTime: "2021-09-26T19:00:00.000-07:00",
      dateTime2: null,
      time: "23:00:00",
      time2: null,
      fromNow: true,
      multipleDates: ["2021-11-01"],
      multipleDates2: [],
    })
  
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
  
    return (
      <>
        <Form state={state} setState={setState} onSubmit={() => {}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DebugBox object={state} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack spacing={1}>
                <DateTimePicker name="dateTime" timeSteps={{ minutes: 5 }} />
                <DateTimePicker
                  name="dateTime2"
                  timeSteps={{ minutes: 15 }}
                  clearable
                  timezone="America/New_York"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack spacing={1}>
                <DatePicker name="date" />
                <DatePicker name="dateClearable" clearable format="l" />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack spacing={1}>
                <TimePicker name="time" />
                <TimePicker name="time2" clearable timeSteps={{ minutes: 1 }} />
              </Stack>
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
              <Stack spacing={1}>
                <Tooltip arrow title="This component is only available in v5">
                  <Button
                    onClick={() => setOpen(true)}
                    aria-label="Select Multiple Dates..."
                  >
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
                <Tooltip arrow title="This component is only available in v5">
                  <Button
                    onClick={() => setOpen2(true)}
                    aria-label="Select Multiple Dates..."
                  >
                    Select Multiple Dates...
                  </Button>
                </Tooltip>
                <MultipleDatePicker
                  open={open2}
                  onClose={() => setOpen2(false)}
                  dates={state.multipleDates2}
                  onChange={(multipleDates2) =>
                    setState((prev) => ({ ...prev, multipleDates2 }))
                  }
                />
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </>
    )
  }
  
    
   
`
  return <Snippet>{codeString}</Snippet>
}
