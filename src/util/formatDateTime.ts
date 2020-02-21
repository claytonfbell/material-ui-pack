import moment from "moment-timezone"

const formatDateTime = (iso8601: string, timeZone?: string) =>
  moment(iso8601)
    .tz(timeZone === undefined ? moment.tz.guess(true) : timeZone)
    .format("lll z")
export default formatDateTime
