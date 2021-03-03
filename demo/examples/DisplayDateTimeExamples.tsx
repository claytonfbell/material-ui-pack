import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import React from "react"
import {
  DisplayDate,
  DisplayDateTime,
  formatDate,
  formatDateTime,
} from "material-ui-pack"

export function DisplayDateTimeExamples() {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Example</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <code>{`formatDateTime("2020-02-21T06:15:06.149Z")`}</code>
            </TableCell>
            <TableCell>{formatDateTime("2020-02-21T06:15:06.149Z")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <code>{`formatDateTime("2020-02-21T06:15:06.149Z", "America/Chicago")`}</code>
            </TableCell>
            <TableCell>
              {formatDateTime("2020-02-21T06:15:06.149Z", "America/Chicago")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <code>{`formatDate("1978-09-22")`}</code>
            </TableCell>
            <TableCell>{formatDate("1978-09-22")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <code>{`<DisplayDateTime iso8601="2020-02-21T06:15:06.149Z" />`}</code>
            </TableCell>
            <TableCell>
              <DisplayDateTime iso8601="2020-02-21T06:15:06.149Z" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <code>{`<DisplayDateTime
          iso8601="2020-02-21T06:15:06.149Z"
          timeZone="America/New_York"
        />`}</code>
            </TableCell>
            <TableCell>
              <DisplayDateTime
                iso8601="2020-02-21T06:15:06.149Z"
                timeZone="America/New_York"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <code>{`<DisplayDateTime iso8601="2020-02-21T06:15:06.149Z" fromNow />`}</code>
            </TableCell>
            <TableCell>
              <DisplayDateTime iso8601="2020-02-21T06:15:06.149Z" fromNow />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <code>{`<DisplayDate ymd="1978-09-22" />`}</code>
            </TableCell>
            <TableCell>
              <DisplayDate ymd="1978-09-22" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <code>{`<DisplayDate ymd="1978-09-22" fromNow />`}</code>
            </TableCell>
            <TableCell>
              <DisplayDate ymd="1978-09-22" fromNow />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
