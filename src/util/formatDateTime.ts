import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(customParseFormat)
dayjs.extend(LocalizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

export const formatDateTime = (iso8601: string, timeZone?: string) => {
  const defaultZone = "America/Chicago"
  return (
    dayjs(fixIso8601StringForIE(iso8601))
      // .tz(timeZone === undefined ? defaultZone : timeZone)
      .format("lll")
  )
}

// https://github.com/iamkun/dayjs/issues/432
export function fixIso8601StringForIE(iso8601: string) {
  //   const newValue = iso8601.replace(/([+-]\d{2})(\d{2})$/g, "$1:$2")
  const newValue = iso8601.replace(/Z/g, "+00:00Z")
  alert(`${iso8601} - ${newValue}`)
  return newValue
}
