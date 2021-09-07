import React from "react"
import {
  CancelButton,
  NumberField,
  SelectCountry,
  SelectRegion,
  SubmitButton,
  TimePicker,
} from "."
import { CurrencyFieldProps, CurrencyField } from "./CurrencyField"
import { DatePicker, DatePickerProps } from "./DatePicker"
import { DateTimePicker, DateTimePickerProps } from "./DateTimePicker"
import { useForm } from "./FormProvider"
import { NumberFieldProps } from "./NumberField"
import { SelectProps, Select } from "./Select"
import { SelectCountryProps } from "./SelectCountry"
import { SelectRegionProps } from "./SelectRegion"
import { TextField } from "./TextField"

import { TextFieldProps } from "./TextField"
import { TimePickerProps } from "./TimePicker"
import { SelectTimeZone, SelectTimeZoneProps } from "./SelectTimeZone"
import { SelectCombo, SelectComboProps } from "./SelectCombo"
import { PercentageField, PercentageFieldProps } from "./PercentageField"
import { Checkbox, CheckboxProps } from "./Checkbox"
import Grid from "@material-ui/core/Grid"
import { Tooltip } from "material-ui-bootstrap"
import Collapse from "@material-ui/core/Collapse"

export type FieldType =
  | "text"
  | "phone"
  | "passsword"
  | "newPassword"
  | "capitalize"
  | "lowercase"
  | "date"
  | "dateTime"
  | "time"
  | "number"
  | "region"
  | "country"
  | "currency"
  | "select"
  | "selectCombo"
  | "timeZone"
  | "percentage"
  | "checkbox"
  | (() => React.ReactElement)

export type Field =
  | (Partial<TextFieldProps> & {
      type:
        | "text"
        | "phone"
        | "passsword"
        | "newPassword"
        | "capitalize"
        | "lowercase"
    })
  | (Partial<DatePickerProps> & {
      type: "date"
    })
  | (Partial<DateTimePickerProps> & {
      type: "dateTime"
    })
  | (Partial<TimePickerProps> & {
      type: "time"
    })
  | (Partial<NumberFieldProps> & {
      type: "number"
    })
  | (Partial<SelectRegionProps> & {
      type: "region"
    })
  | (Partial<SelectCountryProps> & {
      type: "country"
    })
  | (Partial<CurrencyFieldProps> & {
      type: "currency"
    })
  | (Partial<SelectProps> & {
      type: "select"
    })
  | (Partial<SelectTimeZoneProps> & {
      type: "timeZone"
    })
  | (Partial<SelectComboProps> & {
      type: "selectCombo"
    })
  | (Partial<PercentageFieldProps> & {
      type: "percentage"
    })
  | (Partial<CheckboxProps> & {
      type: "checkbox"
    })
  | { type: "custom"; render: () => React.ReactElement }

export type FormSchema<T> = {
  [K in keyof T]?: FieldType | Field
}

type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type GridSpans = {
  xs?: GridSpan
  sm?: GridSpan
  md?: GridSpan
  lg?: GridSpan
  xl?: GridSpan
  tooltip?: string
  collapse?: boolean
  renderAfter?: React.ReactNode | (() => React.ReactNode) | undefined
}

export type FormLayout<T> = {
  [K in keyof T]?: GridSpans
}

export function FormFields() {
  const { formProps } = useForm<any>()
  const { schema, layout } = formProps

  return (
    <>
      {/* <Debug object={{ schema }} /> */}
      <Grid container spacing={2}>
        {schema !== undefined ? (
          <>
            {Object.keys(schema).map(key => {
              const item = schema[key]
              if (item !== undefined) {
                const field: Field =
                  typeof item === "string"
                    ? { type: item }
                    : typeof item === "function"
                    ? { type: "custom", render: item }
                    : item

                let { renderAfter, tooltip, collapse, ...gridSpans } =
                  layout !== undefined && layout[key] !== undefined
                    ? (layout[key] as GridSpans)
                    : ({ xs: 12 } as GridSpans)

                let element: React.ReactElement | null = null

                if (
                  field.type === "text" ||
                  field.type === "lowercase" ||
                  field.type === "newPassword" ||
                  field.type === "passsword" ||
                  field.type === "phone" ||
                  field.type === "capitalize"
                ) {
                  const { type, ...props } = field
                  element = (
                    <TextField
                      name={key}
                      {...props}
                      formatter={
                        field.type === "lowercase"
                          ? "lowercase"
                          : field.type === "phone"
                          ? "phone"
                          : field.type === "capitalize"
                          ? "capitalize"
                          : field.type === "passsword"
                          ? "password"
                          : field.type === "newPassword"
                          ? "newPassword"
                          : field.formatter
                      }
                    />
                  )
                } else if (field.type === "date") {
                  const { type, ...props } = field
                  element = <DatePicker name={key} {...props} />
                } else if (field.type === "dateTime") {
                  const { type, ...props } = field
                  element = <DateTimePicker name={key} {...props} />
                } else if (field.type === "time") {
                  const { type, ...props } = field
                  element = <TimePicker name={key} {...props} />
                } else if (field.type === "number") {
                  const { type, ...props } = field
                  element = <NumberField name={key} {...props} />
                } else if (field.type === "region") {
                  const { type, ...props } = field
                  element = <SelectRegion name={key} {...props} />
                } else if (field.type === "country") {
                  const { type, ...props } = field
                  element = <SelectCountry name={key} {...props} />
                } else if (field.type === "currency") {
                  const { type, ...props } = field
                  element = <CurrencyField name={key} {...props} />
                } else if (field.type === "select") {
                  const { type, ...props } = field
                  element = <Select name={key} {...{ options: [], ...props }} />
                } else if (field.type === "selectCombo") {
                  const { type, ...props } = field
                  element = (
                    <SelectCombo name={key} {...{ options: [], ...props }} />
                  )
                } else if (field.type === "timeZone") {
                  const { type, ...props } = field
                  element = <SelectTimeZone name={key} {...props} />
                } else if (field.type === "percentage") {
                  const { type, ...props } = field
                  element = <PercentageField name={key} {...props} />
                } else if (field.type === "checkbox") {
                  const { type, ...props } = field
                  element = <Checkbox name={key} {...props} />
                } else if (field.type === "custom") {
                  const { render } = field
                  element = render()
                }

                // wrap it with tooltip
                if (element !== null && tooltip !== undefined) {
                  element = <Tooltip title={tooltip}>{element}</Tooltip>
                }

                // wrapt it into a collapse box
                if (element !== null && collapse !== undefined) {
                  element = <Collapse in={collapse}>{element}</Collapse>
                }

                // wrap node with Grid item, inject renderAfter
                return element !== null ? (
                  <React.Fragment key={key}>
                    <Grid item {...gridSpans}>
                      {element}
                    </Grid>
                    {typeof renderAfter === "function"
                      ? renderAfter()
                      : renderAfter}
                  </React.Fragment>
                ) : null
              } else {
                return null
              }
            })}

            {/* submit and cancel buttons  */}
            {formProps.buttons === true ? (
              <>
                <Grid item xs={12} sm={6}>
                  <SubmitButton />
                </Grid>
                {formProps.onCancel !== undefined ? (
                  <Grid item xs={12} sm={6}>
                    <CancelButton onClick={formProps.onCancel} />
                  </Grid>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}
      </Grid>
    </>
  )
}
