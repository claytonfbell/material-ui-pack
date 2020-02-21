import makeStyles from "@material-ui/core/styles/makeStyles"
import Tooltip from "@material-ui/core/Tooltip"
import moment from "moment"
import React from "react"
import formatDateTime from "../util/formatDateTime"

const useStyles = makeStyles({
  root: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
})

interface DisplayDateTimeProps {
  iso8601: string | null
  fromNow?: boolean
  timeZone?: string
}
export default function DisplayDateTime(props: DisplayDateTimeProps) {
  const classes = useStyles()

  const formatted = React.useMemo(
    () =>
      props.iso8601 !== null
        ? formatDateTime(props.iso8601, props.timeZone)
        : undefined,
    [props.iso8601, props.timeZone]
  )

  return (
    <span className={classes.root}>
      {props.iso8601 !== null && props.fromNow && (
        <Tooltip arrow title={formatted}>
          <span>{moment(props.iso8601).fromNow()}</span>
        </Tooltip>
      )}
      {props.iso8601 !== null && !props.fromNow && formatted}
    </span>
  )
}
