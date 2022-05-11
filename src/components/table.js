import { useSelector } from "react-redux";

import React from "react";
import { useTable, useFilters } from "react-table";
import {
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  Select,
} from "@mui/material";

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>Filter</InputLabel>

      <Select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <MenuItem value="">All</MenuItem>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters // useFilters!
  );

  // Render the UI for your table
  return (
    <div>
      <SelectColumnFilter column={allColumns[0]} />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Setting</InputLabel>
        <Select autoWidth label="Setting">
          <FormControl sx={"display:flex-grow; "}>
            <MenuList>
              {allColumns.map((column) => (
                <MenuItem key={column.id}>
                  <div>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />
                    {column.id}
                  </div>
                </MenuItem>
              ))}
              <MenuItem>
                {" "}
                <IndeterminateCheckbox
                  {...getToggleHideAllColumnsProps()}
                />{" "}
                Toggle All
              </MenuItem>
            </MenuList>
          </FormControl>
        </Select>
      </FormControl>

      <table className="test" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

function App() {
  const products = useSelector((state) => state.products.products);

  const columns = React.useMemo(
    () => [
      {
        Header: "Info",
        columns: [
          {
            Header: "Id",
            accessor: "Id",
          },
          {
            Header: "Contract",
            accessor: "Contract",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Offer",
            accessor: "Offer",
          },
          {
            Header: "Data",
            accessor: "Data",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => products, [products]);
  return <Table columns={columns} data={data} />;
}

export default App;
