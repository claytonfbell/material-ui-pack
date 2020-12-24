import {
  getAllTimezones,
  getTimezonesForCountry,
} from "countries-and-timezones"
import dayjs from "dayjs"
import "dayjs/locale/en" // import locale
import relativeTime from "dayjs/plugin/relativeTime"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import React from "react"
import { countries } from "./countries"
import { BaseSelectComboProps, SelectCombo } from "./SelectCombo"
import { CountryIsoType } from "./SelectCountry"

dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(utc)

interface SelectTimeZoneProps extends BaseSelectComboProps {
  country?: string
  countryIsoType?: CountryIsoType
}
export function SelectTimeZone(props: SelectTimeZoneProps) {
  const getOptions = React.useCallback(() => {
    const zones =
      props.country &&
      props.country.length === 2 &&
      props.countryIsoType === "isoAlpha2"
        ? getTimeZonesWithCountry(props.country)
        : props.country &&
          props.country.length === 3 &&
          props.countryIsoType === "isoAlpha3"
        ? getTimeZonesWithCountry(countries.alpha3ToAlpha2(props.country))
        : getAllTimezoneNames()

    return (zones === null ? getAllTimezoneNames() : zones).map((v: string) => {
      let label
      try {
        label = `${v} ${dayjs().tz(v).format("(h:mm A) Z")}`
      } catch {
        label = v
      }

      return {
        value: v,
        label,
      }
    })
  }, [props.country, props.countryIsoType])

  return <SelectCombo {...props} options={getOptions()} />
}

function getAllTimezoneNames(): string[] {
  return Object.entries(getAllTimezones()).map((x) => x[1].name)
}

function getTimeZonesWithCountry(countryIsoCode: string): string[] {
  return getTimezonesForCountry(countryIsoCode).map((x) => x.name)
}
