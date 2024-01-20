import React,{useEffect,useState} from "react";
import PieChartCard from "./components/PieChartCard";
import TotalSpent from "./components/TotalSpent";
import DailyTraffic from "../default/components/DailyTraffic";
import BarChart from "components/charts/BarChart";
import axios from "axios";



const Dashboard = () => {
  const [catName, setCatName] = useState("");
  const [catCount, setCatCount] = useState("");
  useEffect(() => {
    axios.get("https://api.medstown.com/pharmacy/getdiseasewisemedicinecount").then((res) => {
      console.log(res.data);
      setCatName(res.data.map((item) => item._id));
      setCatCount(res.data.map((item) => item.count));
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  useEffect(() => {
    console.log(catName);
    console.log(catCount);
  }, [catName, catCount]);
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"></div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <TotalSpent />
      </div>
      <div>
        <BarChart
          chartData={[
            {
              name: catName,
              data: catCount,
            },
          ]}
          chartOptions={{
            series: [
              {
                name: catName,
                data: catCount,
              },
            ],
            options: {
              chart: {
                height: 500,
                type: "bar",
                width: "100%",
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  dataLabels: {
                    position: "top", // top, center, bottom
                  },
                },
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          }}
        />
      </div> 
    </div>
  );
};

export default Dashboard;
