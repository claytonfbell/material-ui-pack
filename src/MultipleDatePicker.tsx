import DateAdapter from "@mui/lab/AdapterMoment"
import CalendarPicker from "@mui/lab/CalendarPicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import PickersDay from "@mui/lab/PickersDay"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import moment, { Moment } from "moment"
import React, { useState } from "react"
import { useDebounce } from "react-use"

interface Props {
  open: boolean
  onClose: () => void
  dates: string[]
  onChange: (newDates: string[]) => void
}

const FORMAT = "YYYY-MM-DD"

export function MultipleDatePicker({ onChange, dates, ...props }: Props) {
  const [latest, setLatest] = useState<Moment | null>(() => {
    return dates.length > 0 ? moment(dates[0]) : null
  })
  const [add, setAdd] = useState<Moment | null>(null)

  function handleSelect(date: Moment) {
    setLatest(date)
    setAdd(date)
  }

  useDebounce(
    () => {
      if (add !== null) {
        const value = add.format(FORMAT)
        setAdd(null)
        const isSelected = dates.includes(value)
        const newDates = [...dates.filter(x => x !== value)]
        if (isSelected) {
          onChange([...newDates])
        } else {
          onChange(
            [...newDates, value].sort((a, b) => moment(a).diff(moment(b)))
          )
        }
      }
    },
    40,
    [add, dates, onChange]
  )

  function handleRemove(dateStr: string) {
    const newDates = [...dates.filter(x => x !== dateStr)]
    onChange([...newDates])
  }

  const theme = useTheme()
  const isSmDown = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth="xs"
      fullScreen={isSmDown}
    >
      <DialogContent>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={8} md={4}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <CalendarPicker
                date={latest}
                onChange={newDate => {
                  console.log(newDate)
                }}
                renderDay={x => {
                  return (
                    <PickersDay
                      day={x}
                      selected={dates.includes(x.format(FORMAT))}
                      onDaySelect={() => {
                        //
                      }}
                      onMouseDown={() => handleSelect(x)}
                      onTouchStart={() => handleSelect(x)}
                      outsideCurrentMonth={false}
                    />
                  )
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            {dates.map(date => (
              <Chip
                sx={{
                  marginBottom: theme.spacing(1),
                  marginRight: theme.spacing(1),
                }}
                key={date}
                label={moment(date).format("l")}
                color="primary"
                onDelete={() => handleRemove(date)}
              />
            ))}
          </Grid>
          <Grid item>
            <Button onClick={() => onChange([])}>Clear All</Button>
          </Grid>
          <Grid item>
            <Button onClick={props.onClose}>Close</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
