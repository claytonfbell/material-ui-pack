import moment from "moment-timezone"

const formatDate = (ymd: string) =>
  moment(`${ymd} 00:00:00`)
    .tz(moment.tz.guess(true))
    .format("LL")
export default formatDate
