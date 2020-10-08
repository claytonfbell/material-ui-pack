import dayjs from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(LocalizedFormat)

export const formatDate = (ymd: string) =>
  dayjs(`${ymd} 00:00:00`).tz(dayjs.tz.guess()).format("LL")
