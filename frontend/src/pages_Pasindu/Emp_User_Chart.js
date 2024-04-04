import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

function LineChart() {
  const { id } = useParams();
  const [monthSalary, setMonthSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        

        if (post && post.salary && typeof post.salary.january == "number") {
          setMonthSalary(post.salary.january);
        } else {
          throw new Error("Salary data not found for the user");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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
        data: [monthSalary], // If monthSalary is null, set it to 0
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "User Salary for January",
      },
      xaxis: {
        categories: ["January"], // Assuming only January data is displayed
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
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
