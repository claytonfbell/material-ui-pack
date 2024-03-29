import Tooltip from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
import React from "react"
import dayjs from "../dayjs"
import { formatDate } from "../util/formatDate"

const StyledSpan = styled("span")``

interface Props {
  ymd: string | null
  fromNow?: boolean
}
export function DisplayDate(props: Props) {
  const fromNow = (ymd: string) => dayjs(ymd).fromNow()
  return (
    <StyledSpan
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {props.ymd !== null && props.fromNow && (
        <Tooltip arrow title={formatDate(props.ymd)}>
          <span>{fromNow(props.ymd)}</span>
        </Tooltip>
      )}
      {props.ymd !== null && !props.fromNow && formatDate(props.ymd)}
    </StyledSpan>
  )
}
