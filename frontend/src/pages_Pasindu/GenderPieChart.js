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

export default function Example() {
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

  const chartConfig = {
    type: "pie",
    width: 300,
    height: 300,
    series: [maleCount, femaleCount, otherCount],
    labels: ['Male', 'Female', 'Other'], // Renamed series-1 to Male
    options: {
      dataLabels: {
        enabled: false,
      },
      
      animate: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Gender
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
            @material-tailwind/react chart plugin.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} key={refreshKey} /> {/* Use refreshKey as key */}
        <div>
          <h2>User Counts</h2>
          <p>Male Users: {maleCount}</p>
          <p>Female Users: {femaleCount}</p>
          <p>Other Users: {otherCount}</p>
        </div>
      </CardBody>
    </Card>
  );
}
