import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import React from "react"

interface Props {
  size?: number
}

export function Spacer({ size = 2 }: Props) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        height: theme.spacing(size),
      }}
    />
  )
}
