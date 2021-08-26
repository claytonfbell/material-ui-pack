import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

const useStyles = (size: number) =>
  makeStyles(theme => ({
    root: {
      height: theme.spacing(size),
    },
  }))

interface Props {
  size?: number
}

export function Spacer({ size = 2 }: Props) {
  const classes = useStyles(size)()
  return <Box className={classes.root} />
}
