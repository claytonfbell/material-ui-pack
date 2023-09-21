import Collapse from "@mui/material/Collapse"
import Grid from "@mui/material/Grid"
import Tooltip from "@mui/material/Tooltip"
import React from "react"
import {
  CancelButton,
  NumberField,
  SelectCountry,
  SelectRegion,
  SubmitButton,
  TimePicker,
} from "./index-package"
import { Checkbox, CheckboxProps } from "./Checkbox"
import { CurrencyField, CurrencyFieldProps } from "./CurrencyField"
import { DatePicker, DatePickerProps } from "./DatePicker"
import { DateTimePicker, DateTimePickerProps } from "./DateTimePicker"
import { DisplayError } from "./DisplayError"
import { useForm, FormContextType } from "./FormProvider"
import { NumberFieldProps } from "./NumberField"
import { PercentageField, PercentageFieldProps } from "./PercentageField"
import { Select, SelectProps } from "./Select"
import { SelectCombo, SelectComboProps } from "./SelectCombo"
import { SelectCountryProps } from "./SelectCountry"
import { SelectRegionProps } from "./SelectRegion"
import { SelectTimeZone, SelectTimeZoneProps } from "./SelectTimeZone"
import { TextField, TextFieldProps } from "./TextField"
import { TimePickerProps } from "./TimePicker"

export type FieldType<T> =
  | "text"
  | "phone"
  | "password"
  | "newPassword"
  | "capitalize"
  | "lowercase"
  | "email"
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
  | ((key: keyof T, form: FormContextType<T>) => React.ReactElement)

export type Field<T> =
  | (Partial<TextFieldProps> & {
      type:
        | "text"
        | "phone"
        | "password"
        | "newPassword"
        | "capitalize"
        | "lowercase"
        | "email"
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
  | {
      type: "custom"
      render: (key: keyof T, form: FormContextType<T>) => React.ReactElement
    }

export type FormSchema<T> = {
  [K in keyof T]?: FieldType<T> | Field<T>
}

type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type GridSpans = {
  xs?: GridSpan
  sm?: GridSpan
  md?: GridSpan
  lg?: GridSpan
  xl?: GridSpan
}

type GridSpansWithExtras = GridSpans & {
  tooltip?: string
  collapse?: boolean
  renderAfter?: React.ReactNode | (() => React.ReactNode) | undefined
}

export type FormLayout<T> = {
  [K in keyof T]?: GridSpansWithExtras
} & {
  submitButton?: GridSpans
  cancelButton?: GridSpans
}

export function FormFields<T extends object>() {
  const form = useForm<T>()
  const { schema, layout, error } = form.formProps

  return (
    <>
      {/* <Debug object={{ schema }} /> */}
      <Grid container spacing={2}>
        {error !== undefined ? (
          <Grid item xs={12}>
            <DisplayError error={error} />
          </Grid>
        ) : null}
        {schema !== undefined ? (
          <>
            {Object.entries(schema).map((arr) => {
              const key = arr[0] as keyof T
              const item = arr[1] as FieldType<T> | Field<T>
              const name = String(key)
              if (item !== undefined) {
                const field: Field<T> =
                  typeof item === "string"
                    ? { type: item }
                    : typeof item === "function"
                    ? { type: "custom", render: item }
                    : item

                let { renderAfter, tooltip, collapse, ...gridSpans } =
                  layout !== undefined && layout[key] !== undefined
                    ? (layout[key] as GridSpansWithExtras)
                    : ({ xs: 12 } as GridSpansWithExtras)

                let element: React.ReactElement | null = null

                if (
                  field.type === "text" ||
                  field.type === "lowercase" ||
                  field.type === "newPassword" ||
                  field.type === "password" ||
                  field.type === "phone" ||
                  field.type === "capitalize" ||
                  field.type === "email"
                ) {
                  const { type, ...props } = field
                  element = (
                    <TextField
                      name={name}
                      {...props}
                      formatter={
                        field.type === "lowercase"
                          ? "lowercase"
                          : field.type === "phone"
                          ? "phone"
                          : field.type === "capitalize"
                          ? "capitalize"
                          : field.type === "password"
                          ? "password"
                          : field.type === "newPassword"
                          ? "newPassword"
                          : field.type === "email"
                          ? "email"
                          : field.formatter
                      }
                    />
                  )
                } else if (field.type === "date") {
                  const { type, ...props } = field
                  element = <DatePicker name={name} {...props} />
                } else if (field.type === "dateTime") {
                  const { type, ...props } = field
                  element = <DateTimePicker name={name} {...props} />
                } else if (field.type === "time") {
                  const { type, ...props } = field
                  element = <TimePicker name={name} {...props} />
                } else if (field.type === "number") {
                  const { type, ...props } = field
                  element = <NumberField name={name} {...props} />
                } else if (field.type === "region") {
                  const { type, ...props } = field
                  element = <SelectRegion name={name} {...props} />
                } else if (field.type === "country") {
                  const { type, ...props } = field
                  element = <SelectCountry name={name} {...props} />
                } else if (field.type === "currency") {
                  const { type, ...props } = field
                  element = <CurrencyField name={name} {...props} />
                } else if (field.type === "select") {
                  const { type, ...props } = field
                  element = (
                    <Select name={name} {...{ options: [], ...props }} />
                  )
                } else if (field.type === "selectCombo") {
                  const { type, ...props } = field
                  element = (
                    <SelectCombo name={name} {...{ options: [], ...props }} />
                  )
                } else if (field.type === "timeZone") {
                  const { type, ...props } = field
                  element = <SelectTimeZone name={name} {...props} />
                } else if (field.type === "percentage") {
                  const { type, ...props } = field
                  element = <PercentageField name={name} {...props} />
                } else if (field.type === "checkbox") {
                  const { type, ...props } = field
                  element = <Checkbox name={name} {...props} />
                } else if (field.type === "custom") {
                  const { render } = field
                  element = render(key as keyof T, form)
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
                  <React.Fragment key={name}>
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
            {form.formProps.buttons === true ? (
              <>
                <Grid
                  item
                  {...(layout !== undefined && layout.submitButton !== undefined
                    ? layout.submitButton
                    : form.formProps.onCancel !== undefined
                    ? { xs: 12, sm: 6 } // has cancel button too
                    : { xs: 12 })} // no cancel button
                >
                  <SubmitButton />
                </Grid>
                {form.formProps.onCancel !== undefined ? (
                  <Grid
                    item
                    {...(layout !== undefined &&
                    layout.submitButton !== undefined
                      ? layout.cancelButton
                      : { xs: 12, sm: 6 })}
                  >
                    <CancelButton onClick={form.formProps.onCancel} />
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
