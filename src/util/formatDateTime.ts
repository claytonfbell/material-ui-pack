import dayjs from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
// import timezone from "dayjs/plugin/timezone"
// import utc from "dayjs/plugin/utc"

dayjs.extend(LocalizedFormat)
// dayjs.extend(timezone)
// dayjs.extend(utc)

export const formatDateTime = (iso8601: string, timeZone?: string) => {
  //   const defaultTz = dayjs.tz.guess() || "America/Chicago"

  return (
    dayjs(iso8601)
      // .tz(timeZone === undefined ? defaultTz : timeZone)
      .format("lll")
  )
}
