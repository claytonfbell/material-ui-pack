import dayjs from "../dayjs"

export const formatDateTime = (iso8601: string, timeZone?: string) => {
  return dayjs(iso8601).tz(getTimeZone(timeZone)).format("lll z")
}

export function getTimeZone(timeZone?: string) {
  return timeZone === undefined ? dayjs.tz.guess() : timeZone
}
