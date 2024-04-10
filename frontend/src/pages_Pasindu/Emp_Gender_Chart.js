import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import MonthlySalChart from "./Emp_Tot_SalChart";

function Emp_Gender_Chart() {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0); // New state for key

  useEffect(() => {
    async function fetchGenderCounts() {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/posts/posts"
        );
        const maleUsers = response.data.existingPosts.filter(
          (user) => user.gender === "Male"
        );
        const femaleUsers = response.data.existingPosts.filter(
          (user) => user.gender === "Female"
        );
        const otherUsers = response.data.existingPosts.filter(
          (user) => user.gender === "other"
        );
        setMaleCount(maleUsers.length);
        setFemaleCount(femaleUsers.length);
        setOtherCount(otherUsers.length);
        setRefreshKey((prevKey) => prevKey + 1); // Update the key to trigger re-render
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }

    fetchGenderCounts();
  }, []);

  const pieChartConfig = {
    type: "pie",
    width: 500,
    height: 500,
    series: [maleCount, femaleCount, otherCount],

    options: {
      labels: [
        `${"Male - " + [maleCount]}`,
        `${"Female - " + [femaleCount]}`,
        `${"Other - " + [otherCount]}`,
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const seriesIndex = opts.seriesIndex;
          return pieChartConfig.series[seriesIndex];
        },
      },
    },
  };

  return (
    <Card className="overflow-visible mb-10 h-full pb-10 bg-white items-start">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center "
      >
        <div>
          <Typography variant="h6" color="blue-gray">
            Gender
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="ml-10 mt-10 grid place-items-center px-2">
        <Chart {...pieChartConfig} key={refreshKey} />
      </CardBody>
    </Card>
  );
}

export default Emp_Gender_Chart;
