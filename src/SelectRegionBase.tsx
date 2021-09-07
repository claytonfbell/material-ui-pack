import countryRegionData from "country-region-data"
import React from "react"
import { countries } from "./countries"
import { SelectComboBase, SelectComboBaseProps } from "./SelectComboBase"
import { CountryIsoType } from "./SelectCountryBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SelectRegionBaseProps = Omit<SelectComboBaseProps, "options"> & {
  country?: string
  countryIsoType?: CountryIsoType
}

export const SelectRegionBase = React.forwardRef<
  HTMLDivElement,
  SelectRegionBaseProps
>(({ country = "USA", countryIsoType = "isoAlpha3", ...props }, ref) => {
  function getOptions() {
    let countryItem = countryRegionData.find(c => {
      return countryIsoType === "isoAlpha3"
        ? c.countryShortCode === countries.alpha3ToAlpha2(country)
        : c.countryShortCode === country
    })
    if (countryItem !== null && countryItem !== undefined) {
      return countryItem.regions.map(region => ({
        value: region.shortCode,
        label: region.name,
      }))
    }
    return []
  }
  return (
    <SelectComboBase {...props} ref={ref} options={getOptions()} matchValue />
  )
})
