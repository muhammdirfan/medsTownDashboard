import React, { useEffect, useMemo, useState } from "react";
import CardMenu from "components/card/CardMenu";
import Checkbox from "components/checkbox";
import Card from "components/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdOutlineError, MdPending } from "react-icons/md";
import axios from "axios";
import { formattedDate } from "utils";

// time
const events = [
  { id: 1, title: "Order Placed", date: "10:19 PM" },
  { id: 2, title: "Order Accept Time Pharmacy", date: "12:00 AM" },
  { id: 3, title: "Order Accept Time Delivery Partner", date: "2:00 AM" },
  { id: 4, title: "Order Delivery Time", date: "5:20 AM" },
];

const styles = {
  timeline: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflowX: "auto",
    width: "100%",
    whiteSpace: "nowrap",
    padding: "10px 20px",
  },

  timelineEvent: {
    backgroundColor: "#52c41a",
    color: "white",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    // marginRight: "20px",
    padding: "10px",
    minWidth: "200px",
    marginTop: "8px",
  },

  eventDate: {
    fontWeight: "bold",
    marginBottom: "5px",
  },

  eventTitle: {
    fontSize: "14px",
  },
};

const dateOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const CheckTable = (props) => {
  const { columnsData, tableData, title } = props;

  const [selectedItem, setSelectedItem] = useState();
  const [location, setLocation] = useState("");
  const [rowSelected, setRowSelected] = useState(false);

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
    setSelectedItem(selected?.id);
  };

  useEffect(() => {
    const fetchData = async ({ latitude, longitude }) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC8z91LrDu6klUBb9BFBG3Zd_v_3kjVTBI&v`
        );

        const addressComponents = response.data.results[0].address_components;
        const city = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        const area = addressComponents.find(
          (component) =>
            component.types.includes("sublocality") ||
            component.types.includes("neighborhood")
        );

        const cityName = city ? city.long_name : "N/A";
        const areaName = area ? area.long_name : "N/A";

        const formattedLocation = `${areaName}, ${cityName}`;
        setLocation(formattedLocation);
      } catch (error) {
        console.error("Error fetching location:", error);
        throw error; // Re-throw the error to handle it outside of the fetchData function if needed
      }
    };

    const order = data?.find((item) => item);
    fetchData(order?.userLat, order?.userLng);
  }, [data]);

  const handleRowSlected = (selectedRow) => {
    setRowSelected(!rowSelected);
    handleCheck(selectedRow);
  };

  const AdditionalRowContent = ({ data }) => {
    return (
      <tr className="cursor-pointer border">
        <td colSpan={8}>
          <div className="flex w-full items-center justify-between px-5 py-2">
            <div>
              <p className="py-1 text-sm font-semibold">User Name</p>
              <p className="text-sm">username</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">Pharmacy Name</p>
              <p className="text-sm">pharmacy name</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">
                Pharmacy Phone Number
              </p>
              <p className="text-sm">pharmacyPhoneNumber</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">
                Delivery Partner Name
              </p>
              <p className="text-sm">deliveryPartnerName</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">
                Delivery Partner Location
              </p>
              <p className="text-sm">deliveryPartnerLocation</p>
            </div>
            <div>
              <p className="py-1 text-sm font-semibold">
                Delivery Partner Number
              </p>
              <p className="text-sm">deliveryPartnerNumber</p>
            </div>
          </div>
          <div className="bg-gray-50" style={styles?.timeline}>
            {events.map((event, index) => (
              <React.Fragment key={event.id}>
                <div className="bg-red-300" style={styles?.timelineEvent}>
                  <div className="card" style={styles?.eventDate}>
                    {event.date}
                  </div>
                  <div style={styles?.eventTitle}>{event.title}</div>
                </div>
                {index !== events.length - 1 && (
                  <hr
                    className="relative z-10 h-1 w-32"
                    style={{ background: "#52c41a" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="w-full text-center text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-auto">
        {page?.length ? (
          <table
            {...getTableProps()}
            className="w-full pb-5"
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
                      <div
                        className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs"
                        style={{ width: column.width }}
                      >
                        {column.render("Header")}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="border">
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <>
                    <tr
                      {...row.getRowProps()}
                      key={index}
                      // onClick={() => handleCheck(row)}
                      className="border"
                    >
                      {row.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.Header === "ORDER Id") {
                          data = (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                value={rowSelected}
                                handleChange={() => handleRowSlected(row)}
                              />
                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                {cell.value}
                              </p>
                            </div>
                          );
                        } else if (cell.column.Header === "USER NAME") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "USER LOCATION") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {location}
                            </p>
                          );
                        } else if (cell.column.Header === "PHARMACY NAME") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "PHARMACY LOCATION") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (
                          cell.column.Header === "PHARMACY PHONE NUMBER"
                        ) {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "STATUS") {
                          data = (
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full text-xl`}>
                                {cell.value === "accepted" ? (
                                  <MdCheckCircle className="text-green-500" />
                                ) : cell.value === "pending" ? (
                                  <MdPending className="text-orange-500" />
                                ) : cell.value === "Error" ? (
                                  <MdOutlineError className="text-red-500" />
                                ) : null}
                              </div>
                              <p className="text-sm font-bold capitalize text-navy-700 dark:text-white">
                                {cell.value}
                              </p>
                            </div>
                          );
                        } else if (
                          cell.column.Header === "DELIVERY nPARTNER NAME"
                        ) {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (
                          cell.column.Header === "DELIVERY PARTNER LOCATION"
                        ) {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (
                          cell.column.Header === "DELIVERY PARTNER NUMBER"
                        ) {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "PRICE") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "TOTAL ORDER ITEMS") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "QUANTITY") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "TOTAL PRICE") {
                          data = (
                            <p className="bg-red-200 text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "DATE") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {formattedDate(cell.value, dateOptions)}
                            </p>
                          );
                        }
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={index}
                            className="px-2 pt-[14px] pb-[16px] sm:text-[14px]"
                            style={{
                              width: `${cell.column.width}px`,
                            }}
                          >
                            {data}
                          </td>
                        );
                      })}
                    </tr>
                    {selectedItem === row?.id && rowSelected ? (
                      <AdditionalRowContent
                        key={`additionalRow_${row?.id}`}
                        data={row.original}
                      />
                    ) : null}
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex h-[50vh] w-full items-center justify-center">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              No Data Found
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CheckTable;
