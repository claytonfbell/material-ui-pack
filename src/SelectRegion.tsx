import React from "react"
import countryRegionData from "country-region-data"

import SelectCombo, { BaseSelectComboProps } from "./SelectCombo"
import countries from "./countries"

interface SelectRegionProps extends BaseSelectComboProps {
  country: string
}
export default function SelectRegion(props: SelectRegionProps) {
  function getOptions() {
    let country = countryRegionData.find(c => {
      return c.countryShortCode === countries.alpha3ToAlpha2(props.country)
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
