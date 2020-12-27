import MomentUtils from "@date-io/moment"
import IconButton from "@material-ui/core/IconButton"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import CloseIcon from "@material-ui/icons/Close"
import {
  DatePicker as MUIDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import { startCase } from "lodash"
import moment from "moment-timezone"
import React from "react"
import { useForm } from "./FormProvider"
import { useHandleState } from "./hooks/useHandleState"

interface DatePickerProps {
  name: string
  label?: string
  disabled?: boolean
  clearable?: boolean
  required?: boolean
}
export function DatePicker(props: DatePickerProps) {
  const {
    formProps: { busy, size, margin },
    getValue,
    setValue,
  } = useForm()
  const value = getValue(props.name) as string | null
  const dateTime = React.useMemo(
    () => (value === null ? null : moment(value as string)),
    [value]
  )
  const label = props.label === undefined ? startCase(props.name) : props.label

  const handleClear = () => setValue(props.name, null)

  const [open, handleOpen] = useHandleState(false)

  // control open state when clearable
  const extraProps = React.useMemo(
    () =>
      props.clearable
        ? {
            open,
            onClose: handleOpen(false),
            onDoubleClick: handleOpen(true),
          }
        : {},
    [handleOpen, open, props.clearable]
  )

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MUIDatePicker
        {...extraProps}
        clearable={props.clearable}
        fullWidth={true}
        label={label}
        size={size}
        margin={margin}
        disabled={props.disabled || busy}
        required={props.required}
        value={dateTime}
        onChange={(
          e: MaterialUiPickersDate,
          value?: string | null | undefined
        ) => {
          setValue(props.name, e === null ? null : e.format("YYYY-MM-DD"))
        }}
        autoOk
        inputVariant="outlined"
        format={"   LL"}
        InputProps={{
          startAdornment: (
            <IconButton size="small" onClick={handleOpen(true)}>
              <CalendarTodayIcon fontSize="inherit" />
            </IconButton>
          ),
          endAdornment: (
            <>
              {props.clearable && dateTime !== null && (
                <IconButton size="small" onClick={handleClear}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            </>
          ),
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
