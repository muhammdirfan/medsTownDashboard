import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckTable from "components/CheckTable";
import { columnsDataCheck } from "./variables/columnsData";

const OrderHistory = () => {
  const [AllOrder, setOrderHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getallpharmacies(pageNumber);
  }, [pageNumber]);

  const getallpharmacies = (page) => {
    setLoading(true);
    axios
      .get(`https://api.medstown.com/customer/getorders/${page}`)
      .then((res) => {
        setLoading(false);
        setOrderHistory(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePagination = (direction) => {
    if (direction === "back") {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        getallpharmacies(pageNumber);
      }
    } else {
      setPageNumber(pageNumber + 1);
      getallpharmacies(pageNumber);
    }
  };

  const acceptedOrders = AllOrder.filter(
    (order) => order.status === "accepted"
  );

  return (
    <div className="mt-8">
      <div>
        <CheckTable
          columnsData={columnsDataCheck}
          tableData={acceptedOrders}
          title="Orders History"
        />
        <div className="mt-4 flex items-center justify-end gap-5">
          <p className="font-semibold">
            Page No: {!loading ? pageNumber : "_"}
          </p>
          <button
            disabled={loading ? true : false}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => handlePagination("back")}
          >
            Back
          </button>
          <button
            disabled={loading ? true : false}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => handlePagination("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
