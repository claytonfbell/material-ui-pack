import React from "react"
import { countries } from "./countries"
import { BaseSelectComboProps, SelectCombo } from "./SelectCombo"

export type CountryIsoType = "isoAlpha2" | "isoAlpha3"

interface Props extends BaseSelectComboProps {
  isoType?: CountryIsoType
}
export function SelectCountry(props: Props) {
  const isoType: CountryIsoType =
    props.isoType !== undefined ? props.isoType : "isoAlpha3"

  function getOptions() {
    const c = countries.getNames("en")
    return Object.keys(c).map(isoAlpha2 => ({
      value:
        isoType === "isoAlpha3"
          ? countries.alpha2ToAlpha3(isoAlpha2)
          : isoAlpha2,
      label: c[isoAlpha2],
    }))
  }

  return (
    <>
      <SelectCombo {...props} options={getOptions()} matchValue />
    </>
  )
}
