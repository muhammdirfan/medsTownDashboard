export const tableColumns = [
  {
    field: "userName",
    headerName: "User Name",
    width: 200,
  },
  {
    field: "userAddress",
    headerName: "User Address",
    width: 150,
  },
  {
    field: "registeredPhone",
    headerName: "Registered Phone",
    width: 200,
  },
  {
    field: "registeredEmail",
    headerName: "Registered Email",
    width: 200,
  },
  {
    field: "joiningDate",
    headerName: "Joining Date",
    width: 200,
  },
  {
    field: "lastOrderDate",
    headerName: "Last Order Date",
    width: 200,
  },
  {
    field: "lastOrderValue",
    headerName: "Last Order Value",
    width: 200,
    renderCell: (params) => (
      <div>₹ {params.value === null ? 0 : params.value}</div>
    ),
  },
  {
    field: "userAge",
    headerName: "User Age",
    width: 100,
  },
];

export const tableData = [
  {
    _id: "63c3c2a266cf04998f995657",
    userName: "Muhammad",
    userAddress: "Hyderabad, India",
    registeredPhone: +924237658465,
    registeredEmail: "muhammad@gmail.com",
    joiningDate: "12 March, 2023",
    lastOrderDate: "21 December, 2023",
    lastOrderValue: "3000",
    userAge: "30",
  },
  {
    _id: "63c3c2a266cf04998f347657",
    userName: "Ali",
    userAddress: "Hyderabad, India",
    registeredPhone: +924237658465,
    registeredEmail: "ali@gmail.com",
    joiningDate: "12 March, 2023",
    lastOrderDate: "21 December, 2023",
    lastOrderValue: "3000",
    userAge: "30",
  },
];
