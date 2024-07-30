import React from 'react';
import { useTable } from 'react-table';

const RevenueTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Payment ID', accessor: 'payment_id' },
      { Header: 'Total Revenue', accessor: 'total_revenue' },
      { Header: 'Period Start', accessor: 'period_start' },
      { Header: 'Period End', accessor: 'period_end' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Notes', accessor: 'notes' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} border="1">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RevenueTable;
