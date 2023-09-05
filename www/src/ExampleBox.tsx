import CodeIcon from "@mui/icons-material/Code"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { useTheme } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
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
