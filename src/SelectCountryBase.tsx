import React from "react"
import { SelectBase } from "./index-package"
import { countries } from "./countries"
import { SelectComboBase, SelectComboBaseProps } from "./SelectComboBase"

export type CountryIsoType = "isoAlpha2" | "isoAlpha3"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SelectCountryBaseProps = Omit<SelectComboBaseProps, "options"> & {
  isoType?: CountryIsoType
  unitedStatesAndCanadaOnly?: boolean
}

export const SelectCountryBase = React.forwardRef<
  HTMLDivElement,
  SelectCountryBaseProps
>((originalProps, ref) => {
  const {
    isoType: originalIsoType,
    unitedStatesAndCanadaOnly,
    ...props
  } = originalProps

  const isoType: CountryIsoType =
    originalIsoType !== undefined ? originalIsoType : "isoAlpha3"

  function getOptions() {
    const c = countries.getNames("en")
    return Object.keys(c)
      .filter(
        (isoAlpha2) =>
          unitedStatesAndCanadaOnly !== true || ["US", "CA"].includes(isoAlpha2)
      )
      .map((isoAlpha2) => ({
        value:
          isoType === "isoAlpha3"
            ? countries.alpha2ToAlpha3(isoAlpha2) ?? isoAlpha2
            : isoAlpha2,
        label: c[isoAlpha2],
      }))
  }

  return unitedStatesAndCanadaOnly ? (
    <SelectBase {...props} ref={ref} options={getOptions()} />
  ) : (
    <SelectComboBase {...props} ref={ref} options={getOptions()} matchValue />
  )
})
