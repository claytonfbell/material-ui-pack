import Grid from "@material-ui/core/Grid"
import { Alert, bootstrapColors } from "material-ui-bootstrap"
import React from "react"

export default function AlertExample() {
  return (
    <Grid container spacing={3}>
      {bootstrapColors.map((color, idx) => (
        <Grid item key={idx} xs={6} md={3}>
          <Alert color={color} dismissible>
            {color}
          </Alert>
        </Grid>
      ))}
    </Grid>
  )
}
