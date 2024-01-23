import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import config from "../../../config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputField from "components/fields/InputField";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "80vh",
  overflowY: "scroll",
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 200,
  overflowY: "scroll",
};

const Pharmacy = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = useState("");
  const [bussinessName, setBussinessName] = useState("");
  const [bussinessRegNo, setBussinessRegNo] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [medicalLicenseNo, setMedicalLicenseNo] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [dateOfMedicalLicense, setDateOfMedicalLicense] = useState("");
  const [businessTiming, setBusinessTiming] = useState("");
  const [location, setLocation] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");
  const handleClose = () => setOpen(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [storeParams, setStoreParams] = useState(null); //[{}
  const handleDeleteClose = () => setDeleteOpen(false);
  const handelDeleteOpen = (params) => {
    setDeleteOpen(true);
    console.log(params.row);
    setStoreParams(params);
  };
  useEffect(() => {
    getallpharmacies();
  }, []);

  const getallpharmacies = () => {
    axios
      .get(`${config.api}/getallpharmacies`)
      .then((res) => {
        setData(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditPharmacy = (data) => {
    setOpen(true);
    console.log(data.row);
    setFullName(data.row.fullName);
    setBussinessName(data.row.bussinessName);
    setBussinessRegNo(data.row.bussinessRegNo);
    setGstNo(data.row.gstNo);
    setMedicalLicenseNo(data.row.medicalLicenseNo);
    setAddress(data.row.address);
    setPincode(data.row.pincode);
    setBusinessPhone(data.row.businessPhone);
    setOwnerPhone(data.row.ownerPhone);
    setEmail(data.row.email);
    setDateOfRegistration(data.row.dateOfRegistration);
    setDateOfMedicalLicense(data.row.dateOfMedicalLicense);
    setBusinessTiming(data.row.businessTiming);
    setLocation(data.row.location);
    setPharmacyId(data.row.pharmacyId);
  };
  const submitDetails = () => {
    const data = {
      fullName,
      bussinessName,
      bussinessRegNo,
      gstNo,
      medicalLicenseNo,
      address,
      pincode,
      businessPhone,
      ownerPhone,
      email,
      dateOfRegistration,
      dateOfMedicalLicense,
      businessTiming,
      location,
      pharmacyId,
    };
    axios
      .post(`${config.api}/editpharmacy`, data)
      .then((res) => {
        console.log(res);
        getallpharmacies();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(pharmacyId, "data");
  }, [
    fullName,
    bussinessName,
    bussinessRegNo,
    gstNo,
    medicalLicenseNo,
    address,
    pincode,
    businessPhone,
    ownerPhone,
    email,
    dateOfRegistration,
    dateOfMedicalLicense,
    businessTiming,
    location,
  ]);

  const deletePharmacy = (data) => {
    console.log(data.row.pharmacyId);
    axios
      .post(`${config.api}/deletepharmacy`, { pharmacyId: data.row.pharmacyId })
      .then((res) => {
        console.log(res);
        getallpharmacies();
        handleDeleteClose();
      })
      .catch((err) => {
        console.log(err);
        handleDeleteClose();
      });
  };

  return (
    <div>
      <div className="bg mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DataGrid
          disableColumn
          disableDensitySelector
          disableColumnFilter
          disableColumnSelector
          disableSelectionOnClick
          disableColumnMenu
          rows={data}
          columns={[
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
              renderCell: (params) => (
                <div className="flex items-center">
                  {params.row.businessTiming.map((item) => (
                    <div className="flex flex-col">
                      <span>Start: {item.start} AM</span>
                      <span>End: {item.end} PM</span>
                    </div>
                  ))}
                </div>
              ),
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
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ width: "100%" }}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* create input fields */}
          <div className="sticky -top-10 z-50 mb-5 flex h-14 items-center justify-between bg-white px-1">
            <h4 className="text-2xl font-bold">Edit Pharmacy</h4>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <InputField
              label="Bussiness Name"
              value={bussinessName}
              onChange={(e) => setBussinessName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Bussiness Reg No"
              value={bussinessRegNo}
              onChange={(e) => setBussinessRegNo(e.target.value)}
            />
            <InputField
              label="GST No"
              value={gstNo}
              onChange={(e) => setGstNo(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Medical License No"
              value={medicalLicenseNo}
              onChange={(e) => setMedicalLicenseNo(e.target.value)}
            />
            <InputField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <InputField
              label="Business Phone"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Owner Phone"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
            />
            <InputField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Date Of Registration"
              value={dateOfRegistration}
              onChange={(e) => setDateOfRegistration(e.target.value)}
            />
            <InputField
              label="Date Of Medical License"
              value={dateOfMedicalLicense}
              onChange={(e) => setDateOfMedicalLicense(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            {/* <InputField
            label="Business Timing"
            value={businessTiming}
            onChange={(e) => setBusinessTiming(e.target.value)}
          />
          <InputField
            label="Location"
            value={JSON.stringify(location)}
            onChange={(e) => setLocation(e.target.value)}
          /> */}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              className="rounded-md bg-blue-500 px-5 py-2 text-white"
              onClick={submitDetails}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <div className="sticky -top-10 z-50 mb-5 flex h-14 items-center justify-between bg-white px-1">
            <h4 className="text-2xl font-bold">
              Are you sure you want to delete this pharmacy?
            </h4>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              className="rounded-md bg-blue-500 px-5 py-2 text-white"
              onClick={handleDeleteClose}
            >
              No
            </button>
            <button
              className="ml-5 rounded-md bg-red-500 px-5 py-2 text-white"
              onClick={() => deletePharmacy(storeParams)}
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Pharmacy;
