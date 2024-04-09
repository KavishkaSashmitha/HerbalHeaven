import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MonthlySalChart = ({}) => {
  const [januaryCount, setJanuaryCount] = useState(0);
  const [februaryCount, setFebruaryCount] = useState(0);
  const [marchCount, setMarchCount] = useState(0);
  const [aprilCount, setAprilCount] = useState(0);
  const [mayCount, setMayCount] = useState(0);
  const [juneCount, setJuneCount] = useState(0);
  const [julyCount, setJulyCount] = useState(0);
  const [augustCount, setAugustCount] = useState(0);
  const [septemberCount, setSeptemberCount] = useState(0);
  const [octoberCount, setOctoberCount] = useState(0);
  const [novemberCount, setNovemberCount] = useState(0);
  const [decemberCount, setDecemberCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8070/api/posts/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        let januaryCountFromData = 0;
        let februaryCountFromData = 0;
        let marchCountFromData = 0;
        let aprilCountFromData = 0;
        let mayCountFromData = 0;
        let juneCountFromData = 0;
        let julyCountFromData = 0;
        let augustCountFromData = 0;
        let septemberCountFromData = 0;
        let octoberCountFromData = 0;
        let novemberCountFromData = 0;
        let decemberCountFromData = 0;
        responseData.existingPosts.forEach((post) => {
          // Assuming January count is stored as a number in the salary object
          if (post.salary && typeof post.salary.january === "number") {
            januaryCountFromData += post.salary.january;
          }
          if (post.salary && typeof post.salary.february === "number") {
            februaryCountFromData += post.salary.february;
          }
          if (post.salary && typeof post.salary.march === "number") {
            marchCountFromData += post.salary.march;
          }
          if (post.salary && typeof post.salary.april === "number") {
            aprilCountFromData += post.salary.april;
          }
          if (post.salary && typeof post.salary.may === "number") {
            mayCountFromData += post.salary.may;
          }
          if (post.salary && typeof post.salary.june === "number") {
            juneCountFromData += post.salary.june;
          }
          if (post.salary && typeof post.salary.july === "number") {
            julyCountFromData += post.salary.july;
          }
          if (post.salary && typeof post.salary.august === "number") {
            augustCountFromData += post.salary.august;
          }
          if (post.salary && typeof post.salary.september === "number") {
            septemberCountFromData += post.salary.september;
          }
          if (post.salary && typeof post.salary.october === "number") {
            octoberCountFromData += post.salary.october;
          }
          if (post.salary && typeof post.salary.november === "number") {
            novemberCountFromData += post.salary.november;
          }
          if (post.salary && typeof post.salary.december === "number") {
            decemberCountFromData += post.salary.december;
          }
        });
        setJanuaryCount(januaryCountFromData);
        setFebruaryCount(februaryCountFromData);
        setMarchCount(marchCountFromData);
        setAprilCount(aprilCountFromData);
        setMayCount(mayCountFromData);
        setJuneCount(juneCountFromData);
        setJulyCount(julyCountFromData);
        setAugustCount(augustCountFromData);
        setSeptemberCount(septemberCountFromData);
        setOctoberCount(octoberCountFromData);
        setNovemberCount(novemberCountFromData);
        setDecemberCount(decemberCountFromData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const chartConfig = {
    type: "line",
    width:1300,
    height: 400,
    series: [
      {
        name: "Sales",
        data: [
          januaryCount,
          februaryCount,
          marchCount,
          aprilCount,
          mayCount,
          juneCount,
          julyCount,
          augustCount,
          septemberCount,
          octoberCount,
          novemberCount,
          decemberCount,
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
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
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
    <Card className="p-10 overflow-visible bg-blue-gray-200 items-start">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography variant="h6" color="blue-gray">
            Total Months Salary Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          ></Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <div>
          <Chart {...chartConfig} />
        </div>

        <div>
          <ul>{januaryCount}</ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default MonthlySalChart;
