import React, { useEffect, useState, useRef, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import config from "../../../config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputField from "components/fields/InputField";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
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

const Delivery = () => {
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
  const [showMarker, setShowMarker] = useState(false);

  const handleClose = () => setOpen(false);
  useEffect(() => {
    getallpharmacies();
  }, []);

  const getallpharmacies = () => {
    axios
      .get(`https://api.medstown.com/delivery/getalldeliveryboy`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const MyMapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8z91LrDu6klUBb9BFBG3Zd_v_3kjVTBI&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `300px`, width: "100%" }} />,
      mapElement: <div style={{ height: `100%` }} />,
      data: data,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 28.4595, lng: 77.0266 }}>
      {props &&props.data&&  props.data.map((item) => (
        <>
          <Marker
            key={item._id}
            position={{
              lat: item.location?.coordinates[0],
              lng: item.location?.coordinates[1],
            }}
            icon={{
              url: "https://usc1.contabostorage.com/f49065475849480fbcd19fb8279b2f98:medstowninternal/delbike.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() => {
              setShowMarker(item._id);
            }}
          />
          {showMarker === item._id &&
          <InfoWindow
            position={{
              lat: item.location.coordinates[0],
              lng: item.location.coordinates[1],
            }}
            onCloseClick={() => {
              props.hideInfo();
            }}
          >
            <div>
              <h2>{item.fullname}</h2>
              <p>{item.phone}</p>
            </div>
          </InfoWindow>
          }
        </>
      ))}
    </GoogleMap>
  ));
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <MyMapComponent isMarkerShown />
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DataGrid
          rows={data}
          columns={[
            { field: "fullname", headerName: "Name", width: 200 },
            { field: "phone", headerName: "Phone", width: 200 },
            {
              field: "vehicleNumber",
              headerName: "vehicle Number",
              width: 200,
            },
            {
              field: "drivingLicense",
              headerName: "driving License",
              width: 200,
            },
            {
              field: "location",
              headerName: "location",
              width: 200,
              renderCell: (params) => (
                <div>
                  {params && params.location && (
                    <div>
                      <p>{params.location.coordinates[0]}</p>
                      <p>{params.location.coordinates[1]}</p>
                    </div>
                  )}
                </div>
              ),
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ width: "100%" }}
          getRowId={(row) => row._id}
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
          {/* <div className="flex justify-end mt-5">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md" onClick={submitDetails}>
              Submit
            </button>
          </div> */}
        </Box>
      </Modal>
    </div>
  );
};

export default Delivery;
