import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

function LineChart() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [januarySalary, setJanuarySalary] = useState(0);
  const [februarySalary, setFebruarySalary] = useState(0);
  const [marchSalary, setMarchSalary] = useState(0);
  const [aprilSalary, setAprilSalary] = useState(0);
  const [maySalary, setMaySalary] = useState(0);
  const [junesalary, setJuneSalary] = useState(0);
  const [julySalary, setJulySalary] = useState(0);
  const [augustSalary, setAugustSalary] = useState(0);
  const [septemberSalary, setSeptemberSalary] = useState(0);
  const [octoberSalary, setOctoberSalary] = useState(0);
  const [novemberSalary, setNovemberSalary] = useState(0);
  const [decemberSalary, setDecemberSalary] = useState(0);

  useEffect(() => {
    const fetchUserSalaryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8070/api/posts/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user salary data");
        }
        const data = await response.json();
        const post = data?.post;

        if (!post && !post.salary) {
          throw new Error("Salary data not found for the user");
        }

        if (post && post.salary && typeof post.salary.january == "number") {
          setJanuarySalary(post.salary.january);
        }
        if (post && post.salary && typeof post.salary.february == "number") {
          setFebruarySalary(post.salary.february);
        }
        if (post && post.salary && typeof post.salary.march == "number") {
          setMarchSalary(post.salary.march);
        }
        if (post && post.salary && typeof post.salary.april == "number") {
          setAprilSalary(post.salary.april);
        }
        if (post && post.salary && typeof post.salary.may == "number") {
          setMaySalary(post.salary.may);
        }
        if (post && post.salary && typeof post.salary.june == "number") {
          setJuneSalary(post.salary.june);
        }
        if (post && post.salary && typeof post.salary.july == "number") {
          setJulySalary(post.salary.july);
        }
        if (post && post.salary && typeof post.salary.august == "number") {
          setAugustSalary(post.salary.august);
        }
        if (post && post.salary && typeof post.salary.september == "number") {
          setSeptemberSalary(post.salary.september);
        }
        if (post && post.salary && typeof post.salary.october == "number") {
          setOctoberSalary(post.salary.october);
        }
        if (post && post.salary && typeof post.salary.november == "number") {
          setNovemberSalary(post.salary.november);
        }
        // if (post && post.salary && typeof post.salary.december == "number") {
        //   setDecemberSalary(post.salary.december);
        // }
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    fetchUserSalaryData();
  }, [id]);

  const chartConfig = {
    type: "line",
    width: 1300,
    height: 400,
    series: [
      {
        name: "Salary",
        data: [
          januarySalary,
          februarySalary,
          marchSalary,
          aprilSalary,
          maySalary,
          junesalary,
          julySalary,
          augustSalary,
          septemberSalary,
          octoberSalary,
          novemberSalary,
          decemberSalary,
        ], // If monthSalary is null, set it to 0
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        text: "User Salary",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ], // Assuming only January data is displayed
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-gray-700 h-screen flex justify-center items-center">
        <Button className="h-10 w-40" loading={true} style={{ backgroundColor: 'red' }}>Loading</Button>
</div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            User Salary Chart
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <div>
          <Chart {...chartConfig} />
        </div>
      </CardBody>
    </Card>
  );
}

export default LineChart;
