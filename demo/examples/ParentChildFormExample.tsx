import { Box, Button, Dialog, DialogContent, Paper } from "@mui/material"
import { Form, SubmitButton, TextField } from "material-ui-pack"
import React, { useState } from "react"

export function ParentChildFormExample() {
  const [state, setState] = useState({ field1: "", field2: "" })
  const [state2, setState2] = useState({ field3: "", field4: "" })
  const [open, setOpen] = useState(false)

  return (
    <Form
      onSubmit={() => alert("Parent Form Submit!")}
      state={state}
      setState={setState}
    >
      <TextField name="field1" />
      <TextField name="field2" multiline minRows={4} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Paper variant="outlined">
            <Box padding={3}>
              <Form
                onSubmit={() => alert("Child Form Submit!")}
                state={state2}
                setState={setState2}
              >
                <TextField name="field3" />
                <TextField name="field4" multiline minRows={4} />
                <SubmitButton>Submit Child</SubmitButton>
              </Form>
            </Box>
          </Paper>
        </DialogContent>
      </Dialog>
      <Button onClick={() => setOpen(true)}>Open</Button>

      <SubmitButton>Submit Parent</SubmitButton>
    </Form>
  )
}
