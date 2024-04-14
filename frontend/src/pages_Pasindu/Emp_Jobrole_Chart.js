import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

function Emp_Jobrole_Chart() {
  const [managerCount, setManagerCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [technicianCount, setTechnicianCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0); // New state for key

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

  const barChartConfig = {
    type: "bar",
    width: 600,
    height: 355,
    series: [
      {
        name: "Job Role",
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
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: true,
      },
      olors: ["#FF5733", "#FFD700", "#5BBCFF", "#FF1493", "#00FF00"], // Specify your colors here
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
        // Set the maximum value for the y-axis here
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
          right: 70,
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
    <Card className="overflow-visible bg-white items-start">
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
  );
}

export default Emp_Jobrole_Chart;
