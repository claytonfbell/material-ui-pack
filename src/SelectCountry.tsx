import React from "react"

import countries from "./countries"
import SelectCombo, { BaseSelectComboProps } from "./SelectCombo"

interface SelectCountryProps extends BaseSelectComboProps {}
export default function SelectCountry(props: SelectCountryProps) {
  function getOptions() {
    const c = countries.getNames("en")
    return Object.keys(c).map((isoAlpha2, index) => ({
      value: countries.alpha2ToAlpha3(isoAlpha2),
      label: c[isoAlpha2],
    }))
  }

  return (
    <>
      <SelectCombo {...props} options={getOptions()} matchValue />
    </>
  )
}
