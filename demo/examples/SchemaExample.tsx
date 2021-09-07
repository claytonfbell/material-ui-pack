import { Box, FormControlLabel, Grid, Switch } from "@material-ui/core"
import { Alert } from "material-ui-bootstrap"
import { Form, useForm } from "material-ui-pack"
import React from "react"

export function SchemaExample() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    newPassword: "",
    date: "2021-09-22",
    dateTime: null,
    time: "23:00:00",
    number: 10,
    street1: "",
    city: "",
    state: "",
    country: "USA",
    zip: "",
    timeZone: "",
    price: "3.99",
    color: "red",
    color2: "red",
    percentage: "0.111",
    checkTheBox: false,
    custom: false,
    multiline: "",
  })
  const [busy, setBusy] = React.useState(false)

  return (
    <Box>
      <Form
        debug
        onSubmit={() => setBusy(true)}
        onCancel={() => setBusy(false)}
        state={state}
        setState={setState}
        busy={busy}
        submitLabel="Save It!"
        cancelLabel="Forget It!"
        pleaseWaitLabel="Wait!!!!!"
        schema={{
          multiline: { type: "text", multiline: true, minRows: 3 },
          firstName: "capitalize",
          lastName: "capitalize",
          phone: { type: "phone", required: true },
          password: "passsword",
          newPassword: "newPassword",
          date: "date",
          dateTime: { type: "dateTime", timeZone: state.timeZone },
          time: "time",
          number: { type: "number", incrementBy: 1 },
          street1: "text",
          city: "capitalize",
          state: { type: "region", country: state.country },
          country: "country",
          zip: "text",
          price: {
            type: "currency",
          },
          percentage: "percentage",
          color: {
            type: "select",
            label: "Choose a color!",
            options: [
              { value: "red", label: "RED" },
              { value: "blue", label: "BLUE" },
            ],
            allowNull: true,
          },
          color2: state.checkTheBox
            ? undefined
            : {
                type: "selectCombo",
                options: [
                  { value: "red", label: "RED" },
                  { value: "blue", label: "BLUE" },
                ],
              },
          timeZone: {
            type: "timeZone",
            country: state.country,
            countryIsoType: "isoAlpha3",
          },
          checkTheBox: "checkbox",
          custom: () => {
            const {
              getValue,
              setValue,
              formProps: { busy },
            } = useForm<typeof state>()
            return (
              <FormControlLabel
                disabled={busy}
                control={
                  <Switch
                    checked={getValue("custom")}
                    onChange={e => setValue("custom", e.currentTarget.checked)}
                  />
                }
                label="Custom"
              />
            )
          },
        }}
        layout={{
          firstName: { xs: 12, sm: 6 },
          lastName: { xs: 12, sm: 6 },
          number: { xs: 4, tooltip: "tooltip!" },
          time: { xs: 4 },
          city: { xs: 5 },
          state: { xs: 7 },
          country: { xs: 7 },
          zip: {
            xs: 5,
          },
          price: {
            xs: 4,
          },
          percentage: {
            xs: 4,
            tooltip: "This has a tooltip",
          },
          color2: { xs: 12, tooltip: "Yo!" },
          custom: { xs: 6, tooltip: "Custom component" },
          checkTheBox: { xs: 6 },
          timeZone: {
            xs: 12,
            tooltip: "Hello",
            collapse: state.checkTheBox,
            renderAfter: () => (
              <Grid xs={12} item>
                <Alert color="info">Some custom info here!</Alert>
              </Grid>
            ),
          },
        }}
      />
    </Box>
  )
}