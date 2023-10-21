import dayjs from "../dayjs"

export const formatDate = (ymd: string) =>
  dayjs(`${ymd} 00:00:00`).tz(dayjs.tz.guess()).format("LL")
