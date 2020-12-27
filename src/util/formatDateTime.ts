import moment from "moment-timezone"

export const formatDateTime = (iso8601: string, timeZone?: string) => {
  return moment(iso8601)
    .tz(timeZone === undefined ? moment.tz.guess() : timeZone)
    .format("lll z")
}
