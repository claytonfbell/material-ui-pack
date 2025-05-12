import { allCountries } from "country-region-data"
import React, { useMemo } from "react"
import { countries } from "./countries"
import { SelectBase } from "./SelectBase"
import { SelectComboBase, SelectComboBaseProps } from "./SelectComboBase"
import { CountryIsoType } from "./SelectCountryBase"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SelectRegionBaseProps = Omit<SelectComboBaseProps, "options"> & {
  country?: string
  countryIsoType?: CountryIsoType
  fiftyStatesAndDC?: boolean
}

export const SelectRegionBase = React.forwardRef<
  HTMLDivElement,
  SelectRegionBaseProps
>(
  (
    {
      country = "USA",
      countryIsoType = "isoAlpha3",
      fiftyStatesAndDC,
      ...props
    },
    ref
  ) => {
    let countryItem = useMemo(() => {
      return allCountries.find((c) => {
        const [, countryShortCode] = c
        return countryIsoType === "isoAlpha3"
          ? countryShortCode === countries.alpha3ToAlpha2(country)
          : countryShortCode === country
      })
    }, [country, countryIsoType])

    const options = useMemo(() => {
      const exclude = [
        "AA",
        "AE",
        "AP",
        "AS",
        "FM",
        "GU",
        "MH",
        "MP",
        "PW",
        "PR",
        "VI",
      ]

      if (countryItem !== null && countryItem !== undefined) {
        const [, countryShortCode, regions] = countryItem
        return regions
          .filter((region) => {
            const [, shortCode] = region
            return (
              countryShortCode !== "US" ||
              fiftyStatesAndDC !== true ||
              !exclude.includes(shortCode)
            )
          })
          .map((region) => {
            const [name, shortCode] = region
            return {
              value: shortCode,
              label: name,
            }
          })
      }
      return []
    }, [countryItem, fiftyStatesAndDC])

    return fiftyStatesAndDC && countryItem?.[1] === "US" ? (
      <SelectBase {...props} ref={ref} options={options} />
    ) : (
      <SelectComboBase {...props} ref={ref} options={options} matchValue />
    )
  }
)
