import { Button } from "@mui/material"
import { MultipleDatePicker } from "material-ui-pack"
import React, { useState } from "react"

export function MultipleDatePickerExamples() {
  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState<string[]>([])
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Select Dates...
      </Button>
      <MultipleDatePicker
        open={open}
        onClose={() => setOpen(false)}
        dates={dates}
        onChange={x => {
          setDates(x)
        }}
      />
      <pre>{JSON.stringify(dates, null, 2)}</pre>
    </>
  )
}
