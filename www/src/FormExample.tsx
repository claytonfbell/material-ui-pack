import { Box, Grid } from "@material-ui/core"
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
              },
              country: { type: "country", isoType: "isoAlpha2" },
              zip: "text",
              timeZone: {
                type: "timeZone",
                country: state.country,
                countryIsoType: "isoAlpha2",
              },
              agree: { type: "checkbox", label: "Yes, I Agree" },
            }}
            layout={{
              firstName: { xs: 6 },
              lastName: { xs: 6 },
              street1: { xs: 8 },
              street2: { xs: 4 },
              city: { xs: 5 },
              state: { xs: 7 },
              country: { xs: 7 },
              zip: { xs: 5 },
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
