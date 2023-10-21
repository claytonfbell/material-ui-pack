import Tooltip from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
import React from "react"
import dayjs from "../dayjs"
import { formatDateTime } from "../util/formatDateTime"

const StyledSpan = styled("span")``

interface Props {
  iso8601: string | null
  fromNow?: boolean
  timeZone?: string
}
export function DisplayDateTime(props: Props) {
  const formatted = React.useMemo(
    () =>
      props.iso8601 !== null
        ? formatDateTime(props.iso8601, props.timeZone)
        : "",
    [props.iso8601, props.timeZone]
  )
  const fromNow = (iso: string) => dayjs(iso).fromNow()

  return (
    <StyledSpan
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {props.iso8601 !== null && props.fromNow && (
        <Tooltip arrow title={formatted}>
          <span>{fromNow(props.iso8601)}</span>
        </Tooltip>
      )}
      {props.iso8601 !== null && !props.fromNow && formatted}
    </StyledSpan>
  )
}
