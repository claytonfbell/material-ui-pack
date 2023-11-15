import "./dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import React from "react"

interface Props {
  children: React.ReactNode
  adapterLocale?: string
}

export function DateTimeLocalizationProvider({
  children,
  adapterLocale,
}: Props) {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={adapterLocale}
    >
      {children}
    </LocalizationProvider>
  )
}
