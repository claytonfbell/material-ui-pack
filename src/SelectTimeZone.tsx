import React from "react"
import momentTZ from "moment-timezone"

import SelectCombo, { BaseSelectComboProps } from "./SelectCombo"

interface SelectTimeZoneProps extends BaseSelectComboProps {}
export default function SelectTimeZone(props: SelectTimeZoneProps) {
  function getOptions() {
    return momentTZ.tz.names().map(v => ({
      value: v,
      label: `${v} ${momentTZ()
        .tz(v)
        .format("(h:mm A) Z")}`,
    }))
  }

  return <SelectCombo {...props} options={getOptions()} />
}
