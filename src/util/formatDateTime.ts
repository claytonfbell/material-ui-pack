import dayjs from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(LocalizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

const formatDateTime = (iso8601: string, timeZone?: string) => {
  return dayjs(iso8601)
    .tz(timeZone === undefined ? dayjs.tz.guess() : timeZone)
    .format("lll z")
}
export default formatDateTime
