import moment from "moment-timezone"

export const formatDate = (ymd: string) =>
  moment(`${ymd} 00:00:00`).tz(moment.tz.guess()).format("LL")
