import momentTZ from "moment-timezone"
import React from "react"
import countries from "./countries"
import SelectCombo, { BaseSelectComboProps } from "./SelectCombo"
import { CountryIsoType } from "./SelectCountry"
import zonesFromCountries from "./zonesFromCountries"

interface SelectTimeZoneProps extends BaseSelectComboProps {
  country?: string
  countryIsoType?: CountryIsoType
}
export default function SelectTimeZone(props: SelectTimeZoneProps) {
  const getOptions = React.useCallback(() => {
    const zones =
      props.country !== undefined && props.countryIsoType === "isoAlpha2"
        ? zonesFromCountries(props.country)
        : props.country !== undefined && props.countryIsoType === "isoAlpha3"
        ? zonesFromCountries(countries.alpha3ToAlpha2(props.country))
        : momentTZ.tz.names()

    return (zones === null ? momentTZ.tz.names() : zones).map((v: string) => ({
      value: v,
      label: `${v} ${momentTZ().tz(v).format("(h:mm A) Z")}`,
    }))
  }, [props.country, props.countryIsoType])

  return <SelectCombo {...props} options={getOptions()} />
}
