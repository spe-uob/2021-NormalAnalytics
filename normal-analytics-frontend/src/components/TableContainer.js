import React from "react";
import { useTable } from "react-table";
 
export default function Table({ columns, data }) {
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({
   columns,
   data,
 })
 
 return (
    <table {...getTableProps()}>
    <thead>
      <tr>
        <th
          colSpan={columns}
          style={{
            textAlign: "center",
          }}
        >
          {/* rendering global filter */}
          
        </th>
      </tr>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()}>
              {column.render("Header")}
              {/* rendering column filter */}
              <div>{column.canFilter ? column.render("Filter") : null}</div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  </table>
 )
}