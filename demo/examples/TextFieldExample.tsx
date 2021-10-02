import { Box, Grid } from "@mui/material"
import {
  Form,
  Spacer,
  SubmitButton,
  TextField,
  TextFieldBase,
  useForm,
  CancelButton,
} from "material-ui-pack"
import React from "react"

type FormData = {
  phone: string
  password2: string
  password3: string
  someText: string
}

export function TextFieldExample() {
  const [state, setState] = React.useState<FormData>({
    phone: "",
    password2: "",
    password3: "",
    someText: "",
  })
  const [busy, setBusy] = React.useState(false)

  const [value, setValue] = React.useState("")

  return (
    <>
      <Form
        debug
        onSubmit={() => setBusy(true)}
        state={state}
        setState={setState}
        busy={busy}
        margin="dense"
        preventSubmitOnEnterKey
      >
        <TextField name="phone" formatter="phone" />
        <TextField name="password2" formatter="password" />
        <TextField name="password3" formatter="newPassword" />
        <TextField name="someText" rows={4} multiline />
        <CustomInputs />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SubmitButton />
          </Grid>
          <Grid item xs={6}>
            <CancelButton />
          </Grid>
        </Grid>
      </Form>
      <br />
      <br />
      <TextFieldBase
        margin="normal"
        value={value}
        onChange={newValue => setValue(newValue)}
        formatter="phone"
        name="TextFieldBase"
      />
      {/* unmanaged state */}
      <TextFieldBase margin="normal" formatter="phone" name="anotherOne" />
    </>
  )
}

function CustomInputs() {
  const { getValue, setValue, state, setState } = useForm<FormData>()
  return (
    <Box paddingTop={1} paddingBottom={1}>
      <input
        type="text"
        value={getValue("someText")}
        onChange={e => setValue("someText", e.target.value)}
      />
      <Spacer />
      <input
        type="text"
        value={state?.phone}
        onChange={e =>
          setState((prev: any) =>
            prev !== undefined ? { ...prev, phone: e.target.value } : undefined
          )
        }
      />
    </Box>
  )
}
