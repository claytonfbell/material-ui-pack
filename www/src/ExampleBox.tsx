import {
  Box,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"
import CodeIcon from "@material-ui/icons/Code"
import { Tooltip } from "material-ui-bootstrap"
import React from "react"

const useStyles = makeStyles(theme => ({
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
}))

interface ExampleProps {
  title: string
  snippet: React.ReactNode
  children: React.ReactNode
}

export function ExampleBox(props: ExampleProps) {
  const classes = useStyles()
  const [showCode, setShowCode] = React.useState(false)

  return (
    <Paper variant="outlined" style={{ marginBottom: 20 }}>
      <div className={classes.header}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h5" gutterBottom>
              {props.title}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Show code snippet">
              <IconButton size="small" onClick={() => setShowCode(!showCode)}>
                <CodeIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
      <Collapse in={showCode}>
        <Box>{props.snippet}</Box>
      </Collapse>
      <Box padding={2}>{props.children}</Box>
    </Paper>
  )
}
