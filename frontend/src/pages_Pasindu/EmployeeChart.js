import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

function Example() {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  const [managerCount, setManagerCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [technicianCount, setTechnicianCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0); // New state for key

  useEffect(() => {
    async function fetchGenderCounts() {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/posts/posts"
        );
        const maleUsers = response.data.existingPosts.filter(
          (user) => user.gender === "male"
        );
        const femaleUsers = response.data.existingPosts.filter(
          (user) => user.gender === "female"
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

  useEffect(() => {
    async function fetchJobroleCounts() {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/posts/posts"
        );
        const manager = response.data.existingPosts.filter(
          (user) => user.jobrole === "Manager"
        );
        const supervisor = response.data.existingPosts.filter(
          (user) => user.jobrole === "Supervisor"
        );
        const technician = response.data.existingPosts.filter(
          (user) => user.jobrole === "Technician"
        );
        const driver = response.data.existingPosts.filter(
          (user) => user.jobrole === "Driver"
        );
        const worker = response.data.existingPosts.filter(
          (user) => user.jobrole === "Worker"
        );
        setManagerCount(manager.length);
        setSupervisorCount(supervisor.length);
        setTechnicianCount(technician.length);
        setDriverCount(driver.length);
        setWorkerCount(worker.length);
        setRefreshKey((prevKey) => prevKey + 1); // Update the key to trigger re-render
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }

    fetchJobroleCounts();
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

  const barChartConfig = {
    type: "bar",
    width: 650,
    height: 355,
    series: [
      {
        name: "Sales",
        data: [
          managerCount,
          supervisorCount,
          technicianCount,
          driverCount,
          workerCount,
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: ["Manager", "Supervisor", "Technician", "Driver", "Worker"],
      },

      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        max: 10, // Set the maximum value for the y-axis here
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="w-1/2 mr-4">
        <Card className="overflow-visible bg-blue-gray-200 items-start">
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
          <CardBody className="mt-4 grid place-items-center px-2">
            <Chart {...pieChartConfig} key={refreshKey} />
          </CardBody>
        </Card>
      </div>

      <div className="w-1/2">
        <Card className="overflow-visible bg-blue-gray-200 items-start">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                Job Role
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              ></Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...barChartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Example;
