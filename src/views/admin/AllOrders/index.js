import React from "react";
import { columnsDataCheck } from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";
import CheckTable from "components/CheckTable";

const AllOrders = () => {
  return (
    <div className="mt-8">
      <div>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} title="Orders" />
      </div>
    </div>
  );
};

export default AllOrders;
