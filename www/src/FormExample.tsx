import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import Switch from "@mui/material/Switch"
import { Form } from "material-ui-pack"
import React, { useState } from "react"
import { DebugBox } from "./DebugBox"

export function FormExample() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    country: "US",
    zip: "",
    timeZone: null,
    agree: false,
    custom: false,
    comments: "",
  })

  const [busy, setBusy] = useState(false)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box maxWidth={400}>
          <Form
            state={state}
            setState={setState}
            busy={busy}
            onSubmit={() => setBusy(true)}
            onCancel={() => setBusy(false)}
            disabledSubmitButton={state.custom}
            error={state.custom ? "Example error box." : undefined}
            schema={{
              firstName: "capitalize",
              lastName: "capitalize",
              street1: "text",
              street2: { type: "text", label: "Unit" },
              city: "capitalize",
              state: {
                type: "region",
                country: state.country,
                countryIsoType: "isoAlpha2",
                fiftyStatesAndDC: true,
              },
              country: {
                type: "country",
                isoType: "isoAlpha2",
                unitedStatesAndCanadaOnly: true,
              },
              zip: "text",
              timeZone: {
                type: "timeZone",
                country: state.country,
                countryIsoType: "isoAlpha2",
              },
              agree: { type: "checkbox", label: "Yes, I Agree" },
              custom: (key, form) => (
                <FormControlLabel
                  disabled={form.formProps.busy}
                  control={
                    <Switch
                      checked={state.custom}
                      onChange={e =>
                        setState(prev => ({
                          ...prev,
                          custom: e.currentTarget.checked,
                        }))
                      }
                      name="checkedA"
                    />
                  }
                  label="Custom"
                />
              ),
              comments: { type: "text", multiline: true, minRows: 3 },
            }}
            layout={{
              firstName: { xs: 6 },
              lastName: { xs: 6 },
              street1: { xs: 8 },
              street2: { xs: 4 },
              city: { xs: 5 },
              state: { xs: 7 },
              country: { xs: 8 },
              zip: { xs: 4 },
              agree: { xs: 6 },
              custom: { xs: 6 },
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <DebugBox object={{ state }} />
      </Grid>
    </Grid>
  )
}
