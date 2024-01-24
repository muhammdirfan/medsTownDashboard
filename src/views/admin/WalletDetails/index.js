import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { tableColumns, tableData } from "./variables";

const WalletDetails = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DataGrid
          rows={tableData}
          columns={tableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ width: "100%" }}
          getRowId={(row) => row._id}
          //   onRowClick={(row) => {
          //     handleOpen(row.id);
          //   }}
        />
      </div>
    </div>
  );
};

export default WalletDetails;