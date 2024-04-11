import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const HighestSalary = () => {
  // Initialize state variables for tracking the highest salary, the associated username, and the month of the highest salary
  const [highestSalary, setHighestSalary] = useState(0);
  const [userWithHighestSalary, setUserWithHighestSalary] = useState("");
  const [monthOfHighestSalary, setMonthOfHighestSalary] = useState("");

  useEffect(() => {
    // Function to fetch data from the API and calculate the highest salary, associated username, and the month of the highest salary
    async function fetchData() {
      try {
        // Fetch data from the API
        const response = await fetch("http://localhost:8070/api/posts/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();

        // Initialize variables to track the maximum salary, the associated user, and the month of the highest salary
        let maxSalary = 0;
        let maxSalaryUser = "";
        let maxSalaryMonth = "";

        // Iterate through all posts and find the highest salary and associated user
        responseData.existingPosts.forEach((post) => {
          if (post.salary) {
            // Check all months' salaries for the highest value
            for (const month in post.salary) {
              if (typeof post.salary[month] === "number") {
                if (post.salary[month] > maxSalary) {
                  maxSalary = post.salary[month];
                  maxSalaryUser = post.name; // Assuming 'username' is a property in each 'post' object
                  maxSalaryMonth = month; // Store the month of the highest salary
                }
              }
            }
          }
        });

        // Update the state variables with the highest salary, associated username, and the month of the highest salary
        setHighestSalary(maxSalary);
        setUserWithHighestSalary(maxSalaryUser);
        setMonthOfHighestSalary(maxSalaryMonth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the function to fetch data and calculate the highest salary, associated username, and the month of the highest salary
    fetchData();
  }, []);

  // Render the component with the highest salary, associated username, and the month of the highest salary
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
            Highest Salary
          </Typography>
        </div>
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray">
          Highest Salary: {highestSalary}
        </Typography>
        <Typography variant="h6" color="blue-gray">
          User: {userWithHighestSalary}
        </Typography>
        <Typography variant="h6" color="blue-gray">
          Month: {monthOfHighestSalary}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default HighestSalary;
