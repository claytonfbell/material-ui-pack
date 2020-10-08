import makeStyles from "@material-ui/core/styles/makeStyles"
import Tooltip from "@material-ui/core/Tooltip"
import dayjs from "dayjs"
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
        : "",
    [props.iso8601, props.timeZone]
  )
  const fromNow = (iso: string) => dayjs(iso).fromNow()

  return (
    <span className={classes.root}>
      {props.iso8601 !== null && props.fromNow && (
        <Tooltip arrow title={formatted}>
          <span>{fromNow(props.iso8601)}</span>
        </Tooltip>
      )}
      {props.iso8601 !== null && !props.fromNow && formatted}
    </span>
  )
}
