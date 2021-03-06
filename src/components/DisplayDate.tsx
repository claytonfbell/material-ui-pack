import makeStyles from "@material-ui/core/styles/makeStyles"
import Tooltip from "@material-ui/core/Tooltip"
import moment from "moment-timezone"
import React from "react"
import { formatDate } from "../util/formatDate"

const useStyles = makeStyles({
  root: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
})

interface Props {
  ymd: string | null
  fromNow?: boolean
}
export function DisplayDate(props: Props) {
  const classes = useStyles()
  const fromNow = (ymd: string) => moment(ymd).fromNow()
  return (
    <span className={classes.root}>
      {props.ymd !== null && props.fromNow && (
        <Tooltip arrow title={formatDate(props.ymd)}>
          <span>{fromNow(props.ymd)}</span>
        </Tooltip>
      )}
      {props.ymd !== null && !props.fromNow && formatDate(props.ymd)}
    </span>
  )
}
