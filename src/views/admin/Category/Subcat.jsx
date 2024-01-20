import React,{useState,useEffect} from 'react'
import axios from 'axios'
import config from '../../../config'
import { DataGrid } from "@mui/x-data-grid";

function Subcat() {
  const [disease,setDisease] = useState([])
  const [data,setData] = useState([])
  useEffect(() => {
    console.log("subcat")
    // get url params
    const urlParams = window.location.search;
    console.log(urlParams.split("?")[1])
    setDisease(urlParams.split("?")[1])
    const obj = { disease: urlParams.split("?")[1],offset:50}
    axios.post(`${config.api}/getmedsbydisease`,obj).then((res)=>{
      console.log(res.data)
      setData(res.data)
    }
    ).catch((err)=>{
      console.log(err)
    })
  }, [])
  return (
    <div className="mt-5">
    <h4 className=" text-2xl font-bold text-[#014d4d]">{disease}</h4>
    <div className="mt-5 h-full flex flex-row flex-wrap">
      <DataGrid
        rows={data}
        columns={[
          { field: "medicineName", headerName: "Name", width: 200 },
          { field: "medicineCompany", headerName: "Company", width: 200 },
          { field: "medicinePrice", headerName: "Price", width: 200 },
          { field: "medicineDescription", headerName: "Description", width: 400 },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
    </div>
  )
}

export default Subcat