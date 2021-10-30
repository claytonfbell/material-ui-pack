import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import { ResponsiveTable } from "material-ui-pack"
import React, { useState } from "react"
import { DebugBox } from "./DebugBox"

type DataItem = {
  id: number
  title: string
  amount: number
}

const data: DataItem[] = [
  {
    id: 1,
    title: "One",
    amount: 14322,
  },
  {
    id: 2,
    title: "Two",
    amount: 3455,
  },
  {
    id: 3,
    title: "Three",
    amount: 23432,
  },
]

export function ResponsiveTableExample() {
  const [selected, setSelected] = useState<DataItem[]>([])
  const theme = useTheme()

  return (
    <>
      <DebugBox object={{ selected }} />
      <Box
        padding={5}
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <ResponsiveTable
          size="small"
          selected={selected}
          onSelectChange={x => setSelected(x)}
          onEdit={x => console.log(x)}
          onDelete={x => console.log(x)}
          rowData={data}
          schema={[
            {
              xsDownHidden: true,
              label: "ID",
              render: item => item.id,
            },
            {
              xsDownHidden: true,
              label: "Title",
              render: item => <strong>{item.title}</strong>,
            },
            {
              xsDownHidden: true,
              alignRight: true,
              label: "Amount",
              render: item => <>{item.amount.toLocaleString()}</>,
            },
          ]}
        />
      </Box>
    </>
  )
}
