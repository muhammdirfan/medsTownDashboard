import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import InputField from "components/fields/InputField";
import Radio from "components/radio";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Category = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true)
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${config.api}/getdiseaselist`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <button className="bg-[#014d4d] text-white px-3 py-2 rounded-md" onClick={handleOpen}>Add Category+</button>
      </div>
      <h4 className=" text-2xl font-bold text-[#014d4d]">Non-Prescription</h4>
      <div className="mt-5 flex h-full flex-row flex-wrap">
        {data.map((item) => {
          return (
            <div
              className="m-2 cursor-pointer rounded-md bg-[#CCDBDB] p-2 hover:bg-[#014d4d] hover:text-white"
              // redirect to a component with the selected category
              onClick={() => navigate(`/admin/subcat?${item}`)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <h4 className=" text-2xl font-bold text-[#014d4d]">Prescription</h4>
        <div className="mt-5 flex h-full flex-row flex-wrap">
          {data.map((item) => {
            return (
              <div className="m-2 cursor-pointer rounded-md bg-[#CCDBDB] p-2 hover:bg-[#014d4d] hover:text-white">
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h4 className="text-2xl font-bold text-[#014d4d]">Add Category</h4>
            <div className="mt-5">
              <div className="flex items-center align-middle gap-5">
                <div className="flex items-center align-middle gap-2">
                  <input type="radio" name="category" id="prescription" className="mr-2" />
                  <label htmlFor="prescription">Prescription</label>
                </div>
                <div className="flex items-center align-middle gap-2">
                  <input type="radio" name="category" id="non-prescription" className="mr-2" />
                  <label htmlFor="non-prescription">Non-Prescription</label>
                </div>
              </div>
              <InputField
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
              />
            </div>
            <div className="mt-5 flex justify-end">
              <button className="bg-[#014d4d] text-white px-3 py-2 rounded-md">Add Category +</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Category;
