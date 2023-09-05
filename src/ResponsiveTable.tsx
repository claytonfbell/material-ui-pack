import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from "@mui/icons-material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Table, { TablePropsSizeOverrides } from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { OverridableStringUnion } from "@mui/types"
import clsx from "clsx"
import React, { useState } from "react"

export interface ResponsiveTableSchema<DataItem> {
  label: string | React.ReactElement
  alignRight?: boolean
  render: (
    data: DataItem
  ) => React.ReactElement | string | number | null | undefined
  onSortChange?: (ascending: boolean) => void
  ascending?: boolean

  // for responsive control of columns
  xsDownHidden?: boolean
  smDownHidden?: boolean
  mdDownHidden?: boolean
  lgDownHidden?: boolean
  xsUpHidden?: boolean
  smUpHidden?: boolean
  mdUpHidden?: boolean
  lgUpHidden?: boolean
  xlUpHidden?: boolean
}

type Size = OverridableStringUnion<"small" | "medium", TablePropsSizeOverrides>

export interface ResponsiveTableProps<DataItem> {
  schema: ResponsiveTableSchema<DataItem>[]
  rowData: DataItem[]
  totalRow?: React.ReactNode
  onEdit?: (dataItem: DataItem) => void
  onDelete?: (dataItem: DataItem) => void
  onSelectChange?: (selected: DataItem[], dataItem: DataItem | null) => void
  selectionDisabled?: (dataItem: DataItem) => boolean
  selected?: DataItem[]
  striped?: boolean
  variant?: "outlined" | "elevation" | undefined
  elevation?: number | undefined
  size?: Size | undefined
}

export function ResponsiveTable<T extends object>({
  onEdit,
  onDelete,
  onSelectChange,
  selectionDisabled,
  ...props
}: ResponsiveTableProps<T>) {
  const theme = useTheme()

  const [selectedState, setSelectedState] = useState<T[]>([])
  const selected = props.selected || selectedState

  // toggle selection
  const handleSelect = (dataItem: T) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newSelected = [...selected]
    const checked = event.target.checked
    if (selected.indexOf(dataItem) === -1 && checked) {
      newSelected = [...newSelected, dataItem]
    } else if (selected.indexOf(dataItem) !== -1 && !checked) {
      newSelected.splice(selected.indexOf(dataItem), 1)
    }
    setSelectedState(newSelected)
    if (onSelectChange !== undefined) {
      onSelectChange(newSelected, dataItem)
    }
  }
  const allSelected = selected.length === props.rowData.length
  const indeterminate = !allSelected && selected.length > 0
  const handleSelectAll = () => {
    let newSelected = [...selected]
    if (allSelected) {
      newSelected = []
    } else {
      newSelected = [
        ...props.rowData.filter(
          x => selectionDisabled === undefined || selectionDisabled(x) === false
        ),
      ]
    }
    setSelectedState(newSelected)
    if (onSelectChange !== undefined) {
      onSelectChange(newSelected, null)
    }
  }

  const isXsDown = useMediaQuery(theme.breakpoints.down("sm"))
  const isSmDown = useMediaQuery(theme.breakpoints.down("md"))
  const isMdDown = useMediaQuery(theme.breakpoints.down("lg"))
  const isLgDown = useMediaQuery(theme.breakpoints.down("xl"))
  const isXsUp = useMediaQuery(theme.breakpoints.up("xs"))
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"))
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"))
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"))

  const filteredSchema = props.schema.filter(column => {
    if (
      (column.xsDownHidden && isXsDown) ||
      (column.smDownHidden && isSmDown) ||
      (column.mdDownHidden && isMdDown) ||
      (column.lgDownHidden && isLgDown) ||
      (column.xsUpHidden && isXsUp) ||
      (column.smUpHidden && isSmUp) ||
      (column.mdUpHidden && isMdUp) ||
      (column.lgUpHidden && isLgUp) ||
      (column.xlUpHidden && isXlUp)
    ) {
      return false
    }

    return true
  })

  const size: Size =
    props.size !== undefined ? props.size : isXsDown ? "small" : "medium"

  return filteredSchema.length === 0 ? (
    <Box>
      {props.rowData.map((dataItem, index) => {
        return (
          <Paper
            key={index}
            sx={{
              marginBottom: theme.spacing(3),
              "& .label": {
                color: theme.palette.text.disabled,
              },
            }}
            variant={props.variant}
            elevation={props.elevation}
          >
            <Box padding={1}>
              {props.schema.map((x, index) => {
                return (
                  <Grid
                    key={index}
                    container
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <span className="label">{x.label}</span>
                    </Grid>
                    <Grid item>{x.render(dataItem)}</Grid>
                  </Grid>
                )
              })}

              {onEdit !== undefined || onDelete !== undefined ? (
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item></Grid>
                  <Grid item>
                    {onEdit !== undefined ? (
                      <IconButton size="small" onClick={() => onEdit(dataItem)}>
                        <EditIcon />
                      </IconButton>
                    ) : null}
                    {onDelete !== undefined ? (
                      <IconButton
                        size="small"
                        onClick={() => onDelete(dataItem)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                  </Grid>
                </Grid>
              ) : null}
            </Box>
          </Paper>
        )
      })}
      {props.totalRow}
    </Box>
  ) : (
    <TableContainer
      component={Paper}
      variant={props.variant}
      elevation={props.elevation}
    >
      <Table
        size={size}
        sx={{
          "&.striped": {
            "& tr:nth-of-type(odd)": {
              backgroundColor: theme.palette.action.hover,
            },
            "& .iconButton": {
              marginLeft: theme.spacing(1),
            },
          },
        }}
        className={clsx(props.striped === true ? "striped" : null)}
      >
        <TableHead>
          <TableRow className="stripe">
            {onSelectChange !== undefined ? (
              <TableCell>
                <Checkbox
                  indeterminate={indeterminate}
                  color="primary"
                  checked={selected.length > 0}
                  onChange={handleSelectAll}
                />
              </TableCell>
            ) : null}

            {filteredSchema.map((x, index) => {
              return (
                <TableCell
                  key={index}
                  align={x.alignRight === true ? "right" : undefined}
                >
                  {x.onSortChange !== undefined ? (
                    <Button
                      onClick={() => {
                        if (x.onSortChange !== undefined) {
                          x.onSortChange(x.ascending !== true)
                        }
                      }}
                      sx={{
                        textTransform: "none",
                      }}
                      endIcon={
                        x.ascending === true ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      }
                    >
                      {x.label}
                    </Button>
                  ) : (
                    x.label
                  )}
                </TableCell>
              )
            })}
            {onEdit !== undefined || onDelete !== undefined ? (
              <TableCell align="right"></TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow />
          {props.rowData.map((dataItem, index) => {
            const isSelected = selected.indexOf(dataItem) !== -1

            return (
              <TableRow
                hover={onSelectChange !== undefined}
                selected={isSelected}
                key={index}
                className="stripe"
              >
                {onSelectChange !== undefined ? (
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={isSelected}
                      onChange={handleSelect(dataItem)}
                      disabled={
                        selectionDisabled !== undefined
                          ? selectionDisabled(dataItem)
                          : undefined
                      }
                    />
                  </TableCell>
                ) : null}

                {filteredSchema.map((x, index) => {
                  return (
                    <TableCell
                      key={index}
                      align={x.alignRight === true ? "right" : undefined}
                    >
                      {x.render(dataItem)}
                    </TableCell>
                  )
                })}

                {onEdit !== undefined || onDelete !== undefined ? (
                  <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                    {onEdit !== undefined ? (
                      <IconButton
                        className="iconButton"
                        size="small"
                        onClick={() => onEdit(dataItem)}
                      >
                        <EditIcon />
                      </IconButton>
                    ) : null}
                    {onDelete !== undefined ? (
                      <IconButton
                        className="iconButton"
                        size="small"
                        onClick={() => onDelete(dataItem)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                  </TableCell>
                ) : null}
              </TableRow>
            )
          })}
          {props.totalRow}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
