import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"
import CodeIcon from "@mui/icons-material/Code"
import { Tooltip } from "material-ui-bootstrap"
import React from "react"

interface ExampleProps {
  title: string
  snippet: React.ReactNode
  children: React.ReactNode
}

export function ExampleBox(props: ExampleProps) {
  const [showCode, setShowCode] = React.useState(false)
  const theme = useTheme()
  return (
    <Paper variant="outlined" style={{ marginBottom: 20 }}>
      <Box
        sx={{
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingTop: theme.spacing(1),
        }}
      >
        <Grid container justifyContent="space-between">
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
      </Box>
      <Collapse in={showCode}>
        <Box>{props.snippet}</Box>
      </Collapse>
      <Box padding={2}>{props.children}</Box>
    </Paper>
  )
}
