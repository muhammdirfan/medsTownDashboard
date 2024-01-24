import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import config from "../../../config";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

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
};

const Partners = () => {
  const [data, setData] = useState([]);
  const [hundreds, setHundreds] = useState(100);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState({});
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleClose = () => setOpen(false);
  useEffect(() => {
    const obj = {
      offset: 100,
    };
    axios
      .post(`${config.api}/getallmeds`, obj)
      .then((res) => {
        setData(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const incHundreds = () => {
    const obj = {
      offset: hundreds + 100,
    };
    axios
      .post(`${config.api}/getallmeds`, obj)
      .then((res) => {
        setData(res.data.reverse());
        setHundreds(hundreds + 100);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOpen = (id) => {
    const obj = {
      id: id,
    };
    axios
      .post(`${config.api}/getmedbyid`, obj)
      .then((res) => {
        console.log(res.data);
        setModalData(res.data);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <DataGrid
          rows={filteredRows}
          columns={[
            { field: "medicineName", headerName: "Medicine Name", width: 200 },
            {
              field: "medicineCompany",
              headerName: "Medicine Company",
              width: 200,
            },
            {
              field: "medicinePrice",
              headerName: "Price",
              width: 100,
              renderCell: (params) => (
                <div>₹ {params.value === null ? 0 : params.value}</div>
              ),
            },
            {
              field: "disease",
              headerName: "Category",
              width: 200,
            },
            {
              field: "rxRequired",
              headerName: "Rx Required",
              width: 100,
            },
            {
              field: "type",
              headerName: "Type",
              width: 200,
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ width: "100%" }}
          getRowId={(row) => row._id}
          onRowClick={(row) => {
            handleOpen(row.id);
          }}
        />
        <div className="flex justify-end gap-5">
          <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
            Back
          </button>
          <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={incHundreds}
          >
            Next
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              className="mb-5 flex w-1/2 justify-center"
            >
              {modalData.medicineImage &&
                modalData.medicineImage.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        src={item}
                        alt="medicine"
                        height={400}
                        width={400}
                        className="object-contain"
                      />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div className="w-1/2">
              <h4 className="text-xl font-bold">{modalData.medicineName}</h4>
              <div className="mt-20 flex gap-5">
                <div>
                  <p className="text-xl">
                    Company Name :{" "}
                    <span className="font-bold">
                      {modalData.medicineCompany}
                    </span>
                  </p>
                  <p className="text-xl">
                    Price :{" "}
                    <span className="font-bold">
                      ₹ {modalData.medicinePrice}
                    </span>
                  </p>
                  <p className="text-xl">
                    Category :
                    <span className="font-bold">{modalData.disease}</span>{" "}
                  </p>
                  <p className="text-xl">
                    Rx Required :{" "}
                    <span className="font-bold">
                      {modalData.rxRequired === true ? "Yes" : "No"}
                    </span>
                  </p>
                  <p className="text-xl">
                    Type : <span className="font-bold">{modalData.type}</span>
                  </p>
                  {modalData.description &&
                    modalData.description.length > 0 && (
                      <p className="text-xl">
                        Description :{" "}
                        <span className="font-bold">
                          {modalData.description}
                        </span>
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Partners;
