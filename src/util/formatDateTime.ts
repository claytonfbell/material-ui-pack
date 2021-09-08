import moment from "moment-timezone"

export const formatDateTime = (iso8601: string, timeZone?: string) => {
  return moment(iso8601)
    .tz(getTimeZone(timeZone))
    .format("lll z")
}

export function getTimeZone(timeZone?: string) {
  return timeZone === undefined || moment.tz.zone(timeZone) === null
    ? moment.tz.guess()
    : timeZone
}
