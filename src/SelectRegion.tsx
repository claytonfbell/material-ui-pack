import countryRegionData from "country-region-data"
import React from "react"
import countries from "./countries"
import SelectCombo, { BaseSelectComboProps } from "./SelectCombo"
import { CountryIsoType } from "./SelectCountry"

interface SelectRegionProps extends BaseSelectComboProps {
  country: string
  countryIsoType?: CountryIsoType
}
export default function SelectRegion(props: SelectRegionProps) {
  const isoType: CountryIsoType =
    props.countryIsoType !== undefined ? props.countryIsoType : "isoAlpha3"

  function getOptions() {
    let country = countryRegionData.find(c => {
      return isoType === "isoAlpha3"
        ? c.countryShortCode === countries.alpha3ToAlpha2(props.country)
        : c.countryShortCode === props.country
    })
    if (country !== null && country !== undefined) {
      return country.regions.map((region, i) => ({
        value: region.shortCode,
        label: region.name,
      }))
    }
    return []
  }
  return <SelectCombo {...props} options={getOptions()} matchValue />
}
