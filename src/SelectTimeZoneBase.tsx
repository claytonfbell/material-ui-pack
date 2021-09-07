import {
  getAllTimezones,
  getTimezonesForCountry,
} from "countries-and-timezones"
import moment from "moment-timezone"
import React from "react"
import { countries } from "./countries"
import { SelectComboBase, SelectComboBaseProps } from "./SelectComboBase"
import { CountryIsoType } from "./SelectCountryBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SelectTimeZoneBaseProps = Omit<SelectComboBaseProps, "options"> & {
  country?: string
  countryIsoType?: CountryIsoType
}

export const SelectTimeZoneBase = React.forwardRef<
  HTMLDivElement,
  SelectTimeZoneBaseProps
>((props, ref) => {
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
        label = `${v} ${moment()
          .tz(v)
          .format("(h:mm A) Z")}`
      } catch {
        label = v
      }

      return {
        value: v,
        label,
      }
    })
  }, [props.country, props.countryIsoType])

  return <SelectComboBase {...props} ref={ref} options={getOptions()} />
})

function getAllTimezoneNames(): string[] {
  return Object.entries(getAllTimezones()).map(x => x[1].name)
}

function getTimeZonesWithCountry(countryIsoCode: string): string[] {
  const zones = getTimezonesForCountry(countryIsoCode) || []

  return zones.map(x => x.name)
}
