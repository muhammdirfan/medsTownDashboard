import React, { useMemo, useState } from "react";
import CardMenu from "components/card/CardMenu";
import Checkbox from "components/checkbox";
import Card from "components/card";
import Progress from "components/progress";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const events = [
  { id: 1, title: "Event 1", date: "2024-01-19" },
  { id: 2, title: "Event 2", date: "2024-01-20" },
  { id: 3, title: "Event 3", date: "2024-01-21" },
  // Add more events as needed
];

const styles = {
  timeline: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "10px 20px",
  },

  timelineEvent: {
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    marginRight: "10px",
    padding: "10px",
    minWidth: "200px",
  },

  eventDate: {
    fontWeight: "bold",
    marginBottom: "5px",
  },

  eventTitle: {
    fontSize: "14px",
  },
};

const CheckTable = (props) => {
  const { columnsData, tableData, title } = props;

  const [selectedItem, setSlectedItem] = useState();

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const handleCheck = (selected) => {
    console.log(selected, "selected");
    setSlectedItem(selected?.id);
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>

        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <>
                  <tr
                    {...row.getRowProps()}
                    key={index}
                    onClick={() => handleCheck(row)}
                    className="cursor-pointer"
                  >
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (cell.column.Header === "NAME") {
                        data = (
                          <div className="flex items-center gap-2">
                            <Checkbox />
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value[0]}
                            </p>
                          </div>
                        );
                      } else if (cell.column.Header === "PROGRESS") {
                        data = (
                          <Progress
                            width="w-[150px]"
                            height="h-[14px]"
                            value={cell.value}
                            color="blue"
                          />
                        );
                      } else if (cell.column.Header === "QUANTITY") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "DATE") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        );
                      }
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={index}
                          className="pt-[14px] pb-[16px] sm:text-[14px]"
                        >
                          {data}
                        </td>
                      );
                    })}
                  </tr>
                  {selectedItem === row?.id ? (
                    <tr className="w-full border">
                      <div style={styles?.timeline}>
                        {events.map((event) => (
                          <div key={event.id} style={styles?.timelineEvent}>
                            <div style={styles?.eventDate}>{event.date}</div>
                            <div style={styles?.eventTitle}>{event.title}</div>
                          </div>
                        ))}
                      </div>
                    </tr>
                  ) : null}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CheckTable;
