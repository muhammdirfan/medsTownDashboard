export const colunmsDataCheck = [
  {
    field: "Payment identifier",
    headerName: "Payment identifier",
    width: 200,
  },

  { field: "Amount", headerName: "Amount", width: 200 },

  { field: "Value Date", headerName: "Value Date", width: 200 },
  {
    field: "Beneficiary Name",
    headerName: "Beneficiary Name",
    width: 200,
  },
  {
    field: "Bene Account Number",
    headerName: "Bene Account Number",
    width: 200,
  },
  {
    field: "Email ID of beneficiary",
    headerName: "Email ID of beneficiary",
    width: 200,
  },
  {
    field: "Email Body",
    headerName: "Email Body",
    width: 200,
  },
  {
    field: "Debit Account Number",
    headerName: "Debit Account Number",
    width: 200,
  },
  {
    field: "CRN (Narration  / Remarks)",
    headerName: "CRN (Narration  / Remarks)",
    width: 200,
  },
  { field: "Receiver IFSC", headerName: "Receiver IFSC", width: 200 },

  {
    field: "Receiver A/c type",
    headerName: "Receiver A/c type",
    width: 200,
  },
  {
    field: "Remarks (Beneficiary Account Stmt narration)",
    headerName: "Remarks (Beneficiary Account Stmt narration)",
    width: 200,
    // renderCell: (params) => (
    //   <div className="flex items-center">
    //     {params.row.businessTiming.map((item) => (
    //       <div className="flex flex-col">
    //         <span>Start: {item.start} AM</span>
    //         <span>End: {item.end} PM</span>
    //       </div>
    //     ))}
    //   </div>
    // ),
  },
  // {
  //   field: "location",
  //   headerName: "Location",
  //   width: 200,
  //   renderCell: (params) => (
  //     <div className="flex items-center">
  //       <FiExternalLink
  //         size={24}
  //         className="cursor-pointer"
  //         onClick={() =>
  //           window.open(
  //             `https://www.google.com/maps/search/?api=1&query=${params.row.address}${params.row.pincode}`
  //           )
  //         }
  //       />
  //     </div>
  //   ),
  // },
  {
    field: "Action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <div className="flex items-center">
        <p>Hold</p>
        {/* <BiPencil
          size={18}
          onClick={() => EditPharmacy(params)}
          className="mr-7 cursor-pointer hover:text-blue-500"
        /> */}
        <p className=" pr-3 pl-2">Accept</p>
        {/* <AiFillDelete
          size={18}
          onClick={() => handelDeleteOpen(params)}
          className="mr-7 cursor-pointer hover:text-red-500"
        /> */}
        {/* <AiFillEye size={18} className="cursor-pointer" onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${params.row.address}${params.row.pincode}`)} /> */}
      </div>
    ),
  },
];
